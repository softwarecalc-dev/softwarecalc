import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Info, Clock } from 'lucide-react';

// ─── Supported time zones ─────────────────────────────────────────────────────

const TIME_ZONES: { value: string; label: string }[] = [
  { value: 'UTC',                label: 'UTC — Coordinated Universal Time'       },
  { value: 'Europe/London',      label: 'London (GMT / BST)'                    },
  { value: 'Europe/Stockholm',   label: 'Stockholm (CET / CEST)'                },
  { value: 'Europe/Berlin',      label: 'Berlin (CET / CEST)'                   },
  { value: 'Europe/Paris',       label: 'Paris (CET / CEST)'                    },
  { value: 'America/New_York',   label: 'New York (EST / EDT)'                  },
  { value: 'America/Los_Angeles',label: 'Los Angeles (PST / PDT)'               },
  { value: 'Asia/Tokyo',         label: 'Tokyo (JST)'                           },
  { value: 'Australia/Sydney',   label: 'Sydney (AEST / AEDT)'                  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the UTC offset in minutes for a given IANA timezone at a given Date.
 * Uses Intl.DateTimeFormat to derive the offset reliably.
 */
function getOffsetMinutes(tz: string, date: Date): number {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate  = new Date(date.toLocaleString('en-US', { timeZone: tz   }));
  return (tzDate.getTime() - utcDate.getTime()) / 60_000;
}

interface ConversionResult {
  convertedTime: string;   // e.g. "14:35"
  convertedDate: string;   // e.g. "Monday, 5 May 2025"
  diffHours: number;       // signed offset difference in hours
}

function convert(
  datetimeLocal: string,
  fromTz: string,
  toTz: string,
): ConversionResult | null {
  if (!datetimeLocal) return null;

  // Parse the input as a wall-clock time in the "from" timezone.
  // We first create a plain Date from the local string (treated as local by JS),
  // then shift it to account for the fromTz offset vs the browser's local offset.
  const naiveDate = new Date(datetimeLocal);
  if (isNaN(naiveDate.getTime())) return null;

  // Offset of fromTz at this moment
  const fromOffsetMin = getOffsetMinutes(fromTz, naiveDate);
  // Browser's own UTC offset at this moment (in minutes, JS gives opposite sign)
  const localOffsetMin = -naiveDate.getTimezoneOffset();
  // Adjust the UTC instant so naiveDate represents the correct UTC instant for fromTz
  const utcMs = naiveDate.getTime() - (fromOffsetMin - localOffsetMin) * 60_000;
  const utcDate = new Date(utcMs);

  // Format the converted time in toTz
  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: toTz,
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(utcDate);

  const dateStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: toTz,
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  }).format(utcDate);

  // Time difference = toTz offset − fromTz offset at this UTC instant
  const toOffsetMin      = getOffsetMinutes(toTz,   utcDate);
  const fromOffsetMinAdj = getOffsetMinutes(fromTz,  utcDate);
  const diffHours        = (toOffsetMin - fromOffsetMinAdj) / 60;

  return { convertedTime: timeStr, convertedDate: dateStr, diffHours };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TimeZoneConverter() {
  const [datetimeLocal, setDatetimeLocal] = useState('');
  const [fromTz, setFromTz] = useState('UTC');
  const [toTz, setToTz]     = useState('America/New_York');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError]   = useState<string | null>(null);

  // Seed the datetime input with now (local time formatted as datetime-local value)
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const local = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setDatetimeLocal(local);
  }, []);

  const handleConvert = () => {
    if (!datetimeLocal) {
      setError('Please select a date and time.');
      setResult(null);
      return;
    }
    if (fromTz === toTz) {
      setError('Source and target time zones are the same.');
      setResult(null);
      return;
    }
    const r = convert(datetimeLocal, fromTz, toTz);
    if (!r) {
      setError('Invalid date or time.');
      setResult(null);
      return;
    }
    setError(null);
    setResult(r);
  };

  const handleReset = () => {
    setFromTz('UTC');
    setToTz('America/New_York');
    setResult(null);
    setError(null);
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    setDatetimeLocal(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`);
  };

  const diffLabel = result
    ? result.diffHours === 0
      ? 'Same time'
      : `${result.diffHours > 0 ? '+' : ''}${result.diffHours % 1 === 0 ? result.diffHours : result.diffHours.toFixed(1)} hours`
    : null;

  const selectClass =
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Time Zone Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          {/* Date & Time */}
          <div className="space-y-2">
            <Label htmlFor="tz-datetime">Date &amp; Time</Label>
            <Input
              id="tz-datetime"
              type="datetime-local"
              value={datetimeLocal}
              onChange={(e) => { setDatetimeLocal(e.target.value); setError(null); }}
              className="w-full"
            />
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tz-from">From Time Zone</Label>
              <select
                id="tz-from"
                value={fromTz}
                onChange={(e) => { setFromTz(e.target.value); setError(null); }}
                className={selectClass}
              >
                {TIME_ZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tz-to">To Time Zone</Label>
              <select
                id="tz-to"
                value={toTz}
                onChange={(e) => { setToTz(e.target.value); setError(null); }}
                className={selectClass}
              >
                {TIME_ZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button onClick={handleConvert} className="px-8">Convert</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Converted Time
              </p>
              <p className="text-3xl font-bold text-primary">{result.convertedTime}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {TIME_ZONES.find((tz) => tz.value === toTz)?.label ?? toTz}
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Date in Target Zone
              </p>
              <p className="text-lg font-bold leading-snug">{result.convertedDate}</p>
              <p className="text-xs text-muted-foreground mt-2">local calendar date</p>
            </CardContent>
          </Card>

          <Card className={result.diffHours === 0 ? '' : result.diffHours > 0 ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-blue-500/20 bg-blue-500/5'}>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Time Difference
              </p>
              <p className={`text-3xl font-bold ${result.diffHours === 0 ? '' : result.diffHours > 0 ? 'text-emerald-600' : 'text-blue-600'}`}>
                {diffLabel}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {result.diffHours === 0
                  ? 'zones are aligned'
                  : result.diffHours > 0
                  ? 'target is ahead'
                  : 'target is behind'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reference table */}
      <Card className="border-muted bg-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Supported Time Zones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <div className="grid grid-cols-2 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div>Zone</div>
              <div className="text-right">Region / City</div>
            </div>
            {TIME_ZONES.map((tz) => (
              <div key={tz.value} className="grid grid-cols-2 py-3 text-sm items-center">
                <div className="font-mono text-xs text-muted-foreground">{tz.value}</div>
                <div className="text-right">{tz.label.split(' — ')[0]}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
            Conversions account for daylight saving time automatically using your browser's
            built-in Intl API. Offsets shown are correct for the selected date — they may differ
            in winter vs summer for zones that observe daylight saving.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
