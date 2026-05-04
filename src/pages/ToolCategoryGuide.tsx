import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Home, BookOpen, ArrowRight } from 'lucide-react';
import { TOOLS, ToolConfig } from '@/lib/tools';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// ─── Per-category guide content ───────────────────────────────────────────────

interface GuideContent {
  title: string;
  intro: string;
  story: string;
}


const GUIDE_CONTENT: Record<ToolConfig['category'], GuideContent> = {
Finance: {
  title: 'From Paycheck to Property: A Practical Personal Finance Story',
  intro: 'Financial stability starts long before buying a house. You first understand your real income, reduce debt, improve savings, and make smarter long-term decisions with investing and loan planning. This guide follows a realistic journey from salary planning to home ownership using practical financial calculators along the way.',
  story: `
<p>
Alex had spent most of his twenties doing what many people do — working hard, paying bills, and telling himself that “real financial planning” would start next year. Somehow, next year kept moving further away. First it was rent, then car repairs, then holidays, then unexpected expenses. Saving money always felt like something meant for people who already had money.
</p>

<p>
But things changed when he landed a better job.
</p>

<p>
The salary sounded great during the interview. The number looked big, and for the first time in years, he felt like life might finally get easier. But after signing the contract, he sat at his kitchen table and realised something important: gross salary and real salary were not the same thing.
</p>

<p>
He opened a <a href="/salary-after-tax-calculator" class="text-primary underline">Salary After Tax Calculator</a> and entered his new income. The result surprised him. Taxes, deductions, and contributions took a much bigger piece than he expected. His salary still looked good, but suddenly it felt real. This was the number he actually had to work with.
</p>

<p>
Instead of guessing, Alex decided to take control properly. He listed every monthly cost: rent, electricity, food, fuel, insurance, phone bills, subscriptions he had forgotten existed, and the small “just this once” purchases that somehow happened every week.
</p>

<p>
When he compared spending against income, he realised something uncomfortable — he was earning more, but not building anything. His money was disappearing without a plan.
</p>

<p>
That was the moment he decided he wanted more than just surviving month to month. He wanted a house.
</p>

<p>
Not immediately. Not next month. But someday soon enough that it felt like a real goal instead of a fantasy.
</p>

<p>
He started researching what banks actually cared about. One term kept appearing everywhere: debt-to-income ratio. Apparently, lenders did not care how confident you felt — they cared how much of your monthly income was already committed elsewhere.
</p>

<p>
He used a <a href="/debt-to-income-calculator" class="text-primary underline">Debt To Income Calculator</a> and entered his car payment, student loan balance, and credit card payments. The result was worse than he hoped. He was still technically “fine,” but not strong enough for the mortgage he wanted.
</p>

<p>
That meant step one was not buying property. Step one was cleaning up debt.
</p>

<p>
His credit card balance had been annoying him for years. Minimum payments made it feel manageable, but never smaller. He checked a <a href="/credit-card-payoff-calculator" class="text-primary underline">Credit Card Payoff Calculator</a> and saw the brutal truth: if he kept paying the minimum, he would be paying for years.
</p>

<p>
That annoyed him enough to act.
</p>

<p>
He built a simple plan using a <a href="/debt-payoff-calculator" class="text-primary underline">Debt Payoff Calculator</a>. If he cut unnecessary spending and added one extra payment every month, the timeline changed dramatically. Suddenly, the debt had an ending.
</p>

<p>
At work, he started volunteering for extra shifts. Sometimes it was tiring, but every extra hour now had a purpose. He used a <a href="/salary-hourly-calculator" class="text-primary underline">Salary Hourly Calculator</a> to break down what his time was actually worth. Seeing the hourly number made overtime decisions easier. One extra weekend shift was no longer “just work” — it was part of the future house deposit.
</p>

<p>
Months passed. His credit card debt shrank. His savings account slowly stopped looking embarrassing.
</p>

<p>
Then came the question almost everyone asks:
</p>

<p>
Should I save more… or should I invest?
</p>

<p>
Keeping money in the bank felt safe, but inflation made that safety look expensive. Prices kept rising. Rent kept rising. Even groceries seemed offended by his existence.
</p>

<p>
He checked an <a href="/inflation-calculator" class="text-primary underline">Inflation Calculator</a> and realised that money sitting still was quietly losing value every year. That changed how he thought about “playing it safe.”
</p>

<p>
He moved on to a <a href="/compound-interest-calculator" class="text-primary underline">Compound Interest Calculator</a>. At first, the numbers looked small. But when he changed the timeline from two years to ten, then twenty, the graph became ridiculous. Small monthly contributions turned into something that looked like an actual future.
</p>

<p>
For the first time, retirement stopped feeling like an abstract old-person problem. It became math.
</p>

<p>
He opened a <a href="/retirement-calculator" class="text-primary underline">Retirement Calculator</a> and tested different monthly investments. Waiting five more years made a huge difference. Starting now, even imperfectly, mattered more than waiting for the “perfect time.”
</p>

<p>
That lesson hit him harder than expected.
</p>

<p>
He was not late. But he would be if he kept delaying.
</p>

<p>
Still, the house goal remained.
</p>

<p>
He started browsing listings. Apartments. Small townhouses. Places with kitchens that looked suspiciously optimistic in photos.
</p>

<p>
At first, prices looked manageable. Then he opened a <a href="/mortgage-calculator" class="text-primary underline">Mortgage Calculator</a>.
</p>

<p>
That changed everything.
</p>

<p>
Monthly payments were one thing. Interest over twenty-five or thirty years was another. A house listed at one price could quietly cost almost double by the end.
</p>

<p>
He added more detail with a <a href="/loan-payment-calculator" class="text-primary underline">Loan Payment Calculator</a>, adjusting rates and repayment lengths. Shorter loans meant higher monthly pressure. Longer loans meant paying far more over time. There was no magic option — only trade-offs.
</p>

<p>
Then came the deposit problem.
</p>

<p>
Banks wanted security. They wanted proof he could contribute enough upfront. He checked a <a href="/loan-to-value-calculator" class="text-primary underline">Loan To Value Calculator</a> and understood why saving for a larger deposit mattered so much. A better LTV ratio meant better loan conditions and less financial risk.
</p>

<p>
He created a target and used a <a href="/savings-goal-calculator" class="text-primary underline">Savings Goal Calculator</a> to figure out how much he needed to save each month to reach it in two years.
</p>

<p>
The number looked aggressive.
</p>

<p>
But aggressive felt better than vague.
</p>

<p>
At one point, he considered buying a cheaper property, renovating it, and selling later. He tested the idea with a <a href="/break-even-calculator" class="text-primary underline">Break Even Calculator</a> and later a <a href="/roi-calculator" class="text-primary underline">ROI Calculator</a>. Some deals looked exciting until maintenance costs entered the conversation. Numbers were much less romantic than YouTube property influencers.
</p>

<p>
That was probably a good thing.
</p>

<p>
Slowly, Alex stopped thinking like someone trying to “get rich” and started thinking like someone building stability.
</p>

<p>
He paid down debt.
</p>

<p>
He tracked spending.
</p>

<p>
He invested consistently.
</p>

<p>
He understood loans before signing them.
</p>

<p>
He saved with purpose instead of hope.
</p>

<p>
And maybe most importantly, he stopped being intimidated by money.
</p>

<p>
Finance had always seemed like a language spoken by other people — bankers, investors, people in expensive suits saying words like “portfolio” too casually.
</p>

<p>
But now he understood something simple:
</p>

<p>
Most financial decisions were not magic. They were just calculations people avoided because they were uncomfortable.
</p>

<p>
And calculators made uncomfortable things clearer.
</p>

<p>
One evening, sitting at the same kitchen table where this had started, Alex looked at his numbers again.
</p>

<p>
He was not buying the dream house yet.
</p>

<p>
But he had no credit card panic.
</p>

<p>
His savings had direction.
</p>

<p>
His investments had momentum.
</p>

<p>
His mortgage options were realistic.
</p>

<p>
And for the first time in a long time, the future did not feel random.
</p>

<p>
It felt planned.
</p>

<p>
That was worth more than the house itself.
</p>
`
},
  Math: {
  title: 'The Hidden Math of Everyday Life: From Recipes to Real Decisions',
  intro: 'Math is rarely about classrooms alone. It shows up in cooking, budgeting, shopping, studying, construction, fitness, and everyday decisions. This guide follows a realistic day where simple math tools quietly solve problems most people face without even calling it “doing math.”',
  story: `
<p>
Emma never thought of herself as a “math person.”
</p>

<p>
At school, math had always felt like something trapped inside textbooks — equations on whiteboards, formulas to memorise, and exams designed to ruin weekends. Once adult life started, she assumed she had escaped most of it.
</p>

<p>
She was wrong.
</p>

<p>
Math had simply changed clothes.
</p>

<p>
It appeared in grocery stores, bills, rent, recipes, gym progress, and online shopping. It was no longer called algebra — now it was called “figuring things out.”
</p>

<p>
One Saturday morning, Emma started with something simple: pancakes.
</p>

<p>
She was cooking for four people instead of two, and her usual recipe suddenly needed adjusting. Doubling ingredients sounded easy until the fractions arrived. Half a tablespoon became annoying surprisingly fast.
</p>

<p>
She opened a <a href="/fraction-calculator" class="text-primary underline">Fraction Calculator</a> to work through the measurements and then used a <a href="/ratio-calculator" class="text-primary underline">Ratio Calculator</a> to keep ingredient proportions balanced.
</p>

<p>
It felt slightly ridiculous using math tools for breakfast, but bad pancakes were somehow more offensive than difficult equations.
</p>

<p>
Later that day, she went shopping for furniture.
</p>

<p>
She found two rugs she liked. One looked cheaper, but it was also smaller. Comparing total prices was misleading, so she checked a <a href="/unit-price-calculator" class="text-primary underline">Unit Price Calculator</a> mindset — except this time with area and dimensions.
</p>

<p>
She also used a <a href="/percentage-calculator" class="text-primary underline">Percentage Calculator</a> to calculate a weekend sale discount that the store’s giant red “SAVE 35%” sign somehow made intentionally confusing.
</p>

<p>
Retail math had always been suspicious.
</p>

<p>
At work on Monday, math appeared again.
</p>

<p>
Her manager was reviewing monthly performance numbers, and everyone wanted quick summaries. Raw numbers were messy, but averages made patterns easier to understand.
</p>

<p>
Emma used an <a href="/average-calculator" class="text-primary underline">Average Calculator</a> to compare team output across the month and a <a href="/percentage-change-calculator" class="text-primary underline">Percentage Change Calculator</a> to measure growth from the previous quarter.
</p>

<p>
Suddenly “business strategy” looked a lot like middle-school arithmetic wearing a blazer.
</p>

<p>
That evening, her younger brother called with homework panic.
</p>

<p>
He was stuck simplifying fractions and converting decimals into percentages for a test the next day. Apparently, this was now a family emergency.
</p>

<p>
They worked through a <a href="/simplify-fractions-calculator" class="text-primary underline">Simplify Fractions Calculator</a>, then used a <a href="/decimal-to-fraction-calculator" class="text-primary underline">Decimal To Fraction Calculator</a> and a <a href="/decimal-to-percent-calculator" class="text-primary underline">Decimal To Percent Calculator</a>.
</p>

<p>
She realised something funny: helping someone else understand math made it feel much less intimidating.
</p>

<p>
It was rarely difficult because the concept was impossible. Usually, it was difficult because people lost confidence halfway through.
</p>

<p>
A few days later, she was planning gym progress.
</p>

<p>
Her trainer talked about “progressive overload,” but Emma wanted actual numbers. If she increased weight too quickly, recovery suffered. Too slowly, and progress stalled.
</p>

<p>
She used a <a href="/rounding-calculator" class="text-primary underline">Rounding Calculator</a> to keep weekly increases practical and checked estimated percentage increases with the <a href="/percentage-calculator" class="text-primary underline">Percentage Calculator</a> again.
</p>

<p>
Even fitness, apparently, was just spreadsheets with better lighting.
</p>

<p>
Then came apartment hunting.
</p>

<p>
She found a place she liked, but the room dimensions were awkward. Would her desk fit? Would the wardrobe destroy all hope of walking space?
</p>

<p>
She checked dimensions using a <a href="/square-root-calculator" class="text-primary underline">Square Root Calculator</a> while comparing floor area estimates and used a <a href="/proportion-calculator" class="text-primary underline">Proportion Calculator</a> for furniture scaling.
</p>

<p>
Buying furniture without measurements was basically financial gambling.
</p>

<p>
One evening, her father asked a classic parent question:
</p>

<p>
“Can you quickly check if this number is prime?”
</p>

<p>
No explanation. Just that sentence.
</p>

<p>
She decided some questions should not be investigated too deeply and opened a <a href="/prime-number-calculator" class="text-primary underline">Prime Number Calculator</a>, followed by a <a href="/factors-calculator" class="text-primary underline">Factors Calculator</a>.
</p>

<p>
The answer solved whatever mysterious father-project was happening in the garage.
</p>

<p>
She chose not to ask further.
</p>

<p>
The biggest surprise came when she started noticing how often math reduced stress.
</p>

<p>
Uncertainty felt expensive.
</p>

<p>
Should she buy now or wait?
</p>

<p>
Was the discount real?
</p>

<p>
Did the budget work?
</p>

<p>
Would the recipe scale?
</p>

<p>
Was the test answer correct?
</p>

<p>
Most anxiety lived in not knowing.
</p>

<p>
And most of that uncertainty disappeared the moment numbers became clear.
</p>

<p>
Math was not really about equations.
</p>

<p>
It was about confidence.
</p>

<p>
It was the difference between guessing and knowing.
</p>

<p>
Between hoping something fits and measuring first.
</p>

<p>
Between assuming a deal is good and proving it.
</p>

<p>
Between feeling behind and seeing actual progress.
</p>

<p>
Emma still would not describe herself as a math person.
</p>

<p>
But now she understood something better:
</p>

<p>
Everyone is a math person.
</p>

<p>
Some people just call it cooking.
</p>

<p>
Or shopping.
</p>

<p>
Or budgeting.
</p>

<p>
Or life.
</p>

<p>
The numbers were there either way.
</p>

<p>
Calculators simply made them easier to trust.
</p>
`
},
  Conversions: {
  title: 'Lost in Conversion: A Practical Guide to Units in Real Life',
  intro: 'Unit conversions show up everywhere — cooking, travel, shopping, construction, and fitness. This guide follows real situations where using the wrong unit is not just confusing, but can lead to expensive or frustrating mistakes.',
  story: `
<p>
Daniel thought unit conversions were simple.
</p>

<p>
Meters, kilograms, Celsius — he grew up using the metric system and assumed the rest of the world did too. Then he ordered a recipe book online.
</p>

<p>
It arrived from the US.
</p>

<p>
The first recipe called for cups, ounces, and tablespoons. None of which matched anything in his kitchen.
</p>

<p>
He stared at the instructions for a moment, hoping the measurements would somehow convert themselves through sheer willpower.
</p>

<p>
They did not.
</p>

<p>
He opened a <a href="/recipe-volume-converter" class="text-primary underline">Recipe Volume Converter</a> and translated everything into millilitres. Suddenly, the recipe made sense again.
</p>

<p>
Cooking, it turned out, was less about creativity and more about precision.
</p>

<p>
A few days later, he was buying protein powder online.
</p>

<p>
One product listed weight in pounds, another in kilograms. Prices looked different, but comparing them directly felt misleading.
</p>

<p>
He used a <a href="/weight-converter" class="text-primary underline">Weight Converter</a> to standardise everything into kilograms. Only then did the cheaper option reveal itself.
</p>

<p>
Numbers without context were surprisingly deceptive.
</p>

<p>
Later that week, Daniel checked the weather before a trip.
</p>

<p>
The forecast said 86°F.
</p>

<p>
That sounded aggressive, but he had no idea what it actually meant for packing clothes. Guessing wrong could mean sweating all day or freezing at night.
</p>

<p>
He used a <a href="/temperature-converter" class="text-primary underline">Temperature Converter</a> and realised it was about 30°C.
</p>

<p>
Definitely not sweater weather.
</p>

<p>
During the trip, conversions kept appearing.
</p>

<p>
Distances were in miles. Road signs felt unfamiliar. What looked like a short drive turned out to be longer than expected.
</p>

<p>
He checked distances using a <a href="/length-converter" class="text-primary underline">Length Converter</a> and started planning routes more realistically.
</p>

<p>
Travel was much easier when distances made sense.
</p>

<p>
Back home, Daniel decided to redecorate his apartment.
</p>

<p>
He found a desk online with dimensions listed in inches. It looked perfect in photos, but photos had lied to him before.
</p>

<p>
He converted the measurements using the <a href="/length-converter" class="text-primary underline">Length Converter</a> again and compared them to his room.
</p>

<p>
Good decision.
</p>

<p>
Without converting, he would have bought a desk that physically could not fit through his door.
</p>

<p>
That would have been an expensive lesson.
</p>

<p>
The final moment came when he was calculating flooring for his living room.
</p>

<p>
He measured the space, but needed the total area to order materials. Guessing would either waste money or leave gaps.
</p>

<p>
He used a <a href="/square-footage-calculator" class="text-primary underline">Square Footage Calculator</a> to get an exact number.
</p>

<p>
For once, the result felt certain.
</p>

<p>
No estimating. No rounding errors. No surprises.
</p>

<p>
That was when Daniel realised something simple:
</p>

<p>
Conversions were not about math.
</p>

<p>
They were about avoiding mistakes.
</p>

<p>
Using the wrong unit could ruin a recipe, distort a price, misjudge a journey, or waste money on something that does not fit.
</p>

<p>
The numbers were never the problem.
</p>

<p>
Understanding them was.
</p>

<p>
And once everything used the same system, decisions became obvious.
</p>

<p>
Not easier.
</p>

<p>
Just clearer.
</p>

<p>
Which, most of the time, was exactly what he needed.
</p>
`
},
 Health: {
  title: 'Am I Actually Healthy? A Practical Guide to Understanding Your Numbers',
  intro: 'Health is often reduced to a few numbers — weight, height, BMI — but those numbers can feel confusing without context. This guide follows a realistic situation where simple health calculations turn uncertainty into something clearer and easier to understand.',
  story: `
<p>
Sofia had been going to the gym for three months.
</p>

<p>
She felt better. Stronger. More consistent. But when she stepped on the scale, the number had barely changed.
</p>

<p>
That was frustrating.
</p>

<p>
She had expected visible progress — something obvious, something measurable. Instead, she got a number that refused to move in the way she wanted.
</p>

<p>
That was when she started asking a different question:
</p>

<p>
Was weight really the right thing to focus on?
</p>

<p>
She had heard about BMI before, but never paid much attention to it. This time, she decided to check properly. She opened a <a href="/bmi-calculator" class="text-primary underline">BMI Calculator</a> and entered her height and weight.
</p>

<p>
The result gave her a category — not perfect, but more informative than a single number on a scale.
</p>

<p>
It showed her something important:
</p>

<p>
Progress was not always obvious from weight alone.
</p>

<p>
At first, the number made her uneasy.
</p>

<p>
Labels like “normal,” “overweight,” or “underweight” felt more serious than expected. But after reading more, she understood that BMI was not a judgement — it was a reference point.
</p>

<p>
Not a final answer.
</p>

<p>
A starting point.
</p>

<p>
That changed how she saw it.
</p>

<p>
Instead of asking “Is this good or bad?”, she started asking:
</p>

<p>
“What does this mean for me?”
</p>

<p>
Over the next few weeks, Sofia kept tracking her workouts.
</p>

<p>
She noticed her strength improving.
</p>

<p>
Her energy levels were better.
</p>

<p>
Her consistency was stronger than ever.
</p>

<p>
And even though the scale barely moved, her body composition was changing in ways the number could not fully capture.
</p>

<p>
That was the moment everything clicked.
</p>

<p>
Health was not a single number.
</p>

<p>
It was a combination of habits, consistency, and understanding what the numbers actually represent.
</p>

<p>
The BMI result did not define her.
</p>

<p>
But it gave her context.
</p>

<p>
It helped her understand where she was starting from, and where she might want to go.
</p>

<p>
Most importantly, it removed the guesswork.
</p>

<p>
Instead of relying on assumptions, she had something objective to look at.
</p>

<p>
Something measurable.
</p>

<p>
Something she could track over time.
</p>

<p>
She still had goals.
</p>

<p>
She still wanted to improve.
</p>

<p>
But now, she understood something she had missed before:
</p>

<p>
Progress is easier when you understand the numbers behind it.
</p>

<p>
Not perfectly.
</p>

<p>
But clearly enough to move forward with confidence.
</p>
`
},
'Date & Time': {
  title: 'Where Did the Time Go? A Practical Guide to Deadlines, Work Hours, and Life',
  intro: 'Time calculations seem simple until they are not. Deadlines, work hours, age, and date differences quickly become confusing when real-life details are involved. This guide follows everyday situations where understanding time properly makes the difference between stress and control.',
  story: `
<p>
Mark always felt like he was running out of time.
</p>

<p>
Deadlines at work, plans with friends, bills, birthdays — everything seemed to stack up faster than expected. Days felt short, weeks disappeared, and months passed without warning.
</p>

<p>
But the real problem was not time itself.
</p>

<p>
It was not knowing where it went.
</p>

<p>
One Monday morning, his manager asked a simple question:
</p>

<p>
“How many hours did you work last week?”
</p>

<p>
Mark guessed.
</p>

<p>
That was his first mistake.
</p>

<p>
Between late starts, early finishes, and one shift that ran past midnight, the numbers were not as obvious as they seemed. He opened an <a href="/hours-worked-calculator" class="text-primary underline">Hours Worked Calculator</a> and entered each shift properly.
</p>

<p>
The result was not what he expected.
</p>

<p>
He had worked more than he thought — but also less efficiently than he assumed.
</p>

<p>
That small correction changed how he approached the next week.
</p>

<p>
A few days later, another problem appeared.
</p>

<p>
A project deadline was “two weeks away.”
</p>

<p>
That sounded comfortable.
</p>

<p>
Until he realised he did not actually know how many days that meant with weekends included. He checked using a <a href="/date-time-difference-calculator" class="text-primary underline">Date Time Difference Calculator</a>.
</p>

<p>
The answer felt shorter than expected.
</p>

<p>
Deadlines always did.
</p>

<p>
From that moment, “two weeks” stopped being a vague idea and became a real number he could plan around.
</p>

<p>
Later that evening, Mark remembered his friend’s birthday was coming up.
</p>

<p>
He knew it was “soon,” but soon had a bad habit of turning into “too late.” He opened a <a href="/days-until-date-calculator" class="text-primary underline">Days Until Date Calculator</a>.
</p>

<p>
Five days.
</p>

<p>
Not “soon.”
</p>

<p>
Urgent.
</p>

<p>
He ordered the gift immediately.
</p>

<p>
Problem avoided.
</p>

<p>
The biggest moment came during a family dinner.
</p>

<p>
Someone asked how old his grandfather was — not roughly, but exactly.
</p>

<p>
Mark could guess.
</p>

<p>
Or he could know.
</p>

<p>
He opened an <a href="/age-calculator" class="text-primary underline">Age Calculator</a> and entered the birth date.
</p>

<p>
The result showed years, months, and days.
</p>

<p>
It felt oddly satisfying.
</p>

<p>
Time, for once, was precise.
</p>

<p>
Over the next few weeks, Mark started noticing a pattern.
</p>

<p>
Every time something felt stressful, it usually involved time being unclear.
</p>

<p>
How long something would take.
</p>

<p>
How much time was left.
</p>

<p>
How much time had already passed.
</p>

<p>
Uncertainty made everything feel worse.
</p>

<p>
But when the numbers were clear, decisions became easier.
</p>

<p>
He could plan properly.
</p>

<p>
Prioritise better.
</p>

<p>
Avoid last-minute panic.
</p>

<p>
Even rest without guilt.
</p>

<p>
Time did not slow down.
</p>

<p>
Deadlines did not disappear.
</p>

<p>
Life did not suddenly become less busy.
</p>

<p>
But something important changed:
</p>

<p>
Mark stopped guessing.
</p>

<p>
And when he stopped guessing, time stopped feeling like something chasing him.
</p>

<p>
It became something he could actually manage.
</p>

<p>
Not perfectly.
</p>

<p>
But clearly.
</p>

<p>
And most of the time, that was enough.
</p>
`
},
 
'Random Generators': {
  title: 'When You Can’t Decide: A Practical Guide to Letting Randomness Choose',
  intro: 'Sometimes there is no right answer — just too many options. Random generators remove bias, overthinking, and indecision by giving you a fair, instant result when you need it most.',
  story: `
<p>
Elias had a small problem.
</p>

<p>
Not a serious one. Not life-changing. Just one of those annoying decisions that should be easy but somehow was not.
</p>

<p>
What should he eat?
</p>

<p>
He opened three different food apps, scrolled for ten minutes, and closed all of them without choosing anything.
</p>

<p>
Too many options.
</p>

<p>
That was the real problem.
</p>

<p>
So he tried something different.
</p>

<p>
He listed a few options and opened a <a href="/random-number-generator" class="text-primary underline">Random Number Generator</a>.
</p>

<p>
Each number matched a choice.
</p>

<p>
One click later, the decision was made.
</p>

<p>
No debate.
</p>

<p>
No overthinking.
</p>

<p>
Just food on the way.
</p>

<p>
It felt surprisingly good.
</p>

<p>
Later that week, he ran into the same idea again.
</p>

<p>
At work, his team needed to pick a winner for a small giveaway. Normally, this turned into awkward discussions about fairness.
</p>

<p>
This time, he suggested something simple:
</p>

<p>
“Let’s just randomise it.”
</p>

<p>
They used the <a href="/random-number-generator" class="text-primary underline">Random Number Generator</a> again.
</p>

<p>
Everyone agreed on the result instantly.
</p>

<p>
No bias.
</p>

<p>
No arguments.
</p>

<p>
Just a fair outcome.
</p>

<p>
The biggest surprise came when he started using randomness for small daily decisions.
</p>

<p>
Which task to start first.
</p>

<p>
Which workout to do.
</p>

<p>
Which movie to watch.
</p>

<p>
It was not about avoiding responsibility.
</p>

<p>
It was about removing unnecessary friction.
</p>

<p>
Not every decision needed deep analysis.
</p>

<p>
Some just needed to be made.
</p>

<p>
And randomness was better than hesitation.
</p>

<p>
Over time, Elias noticed something interesting:
</p>

<p>
The stress was never about the outcome.
</p>

<p>
It was about choosing.
</p>

<p>
Once the choice was made — even randomly — everything became easier.
</p>

<p>
He moved forward.
</p>

<p>
No second guessing.
</p>

<p>
No endless comparison.
</p>

<p>
Just action.
</p>

<p>
Not every decision should be random.
</p>

<p>
But when options are equal, and overthinking takes over, letting randomness decide is sometimes the most efficient choice of all.
</p>
`
},
  'Game Calculators': {
  title: 'Play Smarter, Not Luckier: A Guide to Game Strategy and Odds',
  intro: 'Games like blackjack and poker may feel like luck, but decisions are driven by probability and strategy. This guide shows how understanding the numbers behind each move can completely change how you play.',
  story: `
<p>
Lucas always thought he was a “decent” player.
</p>

<p>
Not professional. Not terrible. Just good enough to win sometimes and lose sometimes. Whether it was blackjack or poker, he trusted his instincts.
</p>

<p>
That worked — until it didn’t.
</p>

<p>
One night, after a long losing streak, he started questioning something simple:
</p>

<p>
Was he actually making good decisions?
</p>

<p>
Or just lucky ones?
</p>

<p>
He started with blackjack.
</p>

<p>
Usually, he would hit or stand based on what “felt right.” But this time, he checked a <a href="/blackjack-calculator" class="text-primary underline">Blackjack Calculator</a>.
</p>

<p>
The recommended move surprised him.
</p>

<p>
In situations where he would normally play safe, the calculator suggested taking a risk. In others, it told him to stop when he would usually keep going.
</p>

<p>
It was not random.
</p>

<p>
It was based on probability.
</p>

<p>
At first, it felt uncomfortable going against his instincts.
</p>

<p>
But over time, he noticed something:
</p>

<p>
The decisions were consistent.
</p>

<p>
Not emotional.
</p>

<p>
Not reactive.
</p>

<p>
Just mathematically sound.
</p>

<p>
Later, he tried the same approach with poker.
</p>

<p>
He recreated a hand using a <a href="/texas-holdem-odds-calculator" class="text-primary underline">Texas Holdem Odds Calculator</a>.
</p>

<p>
The result showed his actual chance of winning.
</p>

<p>
It was lower than he expected.
</p>

<p>
Much lower.
</p>

<p>
That explained a lot.
</p>

<p>
He had been calling bets based on hope, not probability.
</p>

<p>
And hope, it turned out, was expensive.
</p>

<p>
The biggest shift was not in the games themselves.
</p>

<p>
It was in how he thought.
</p>

<p>
Winning a hand no longer meant he made the right decision.
</p>

<p>
And losing did not always mean he made the wrong one.
</p>

<p>
What mattered was whether the choice made sense based on the odds.
</p>

<p>
That idea changed everything.
</p>

<p>
He stopped chasing lucky outcomes.
</p>

<p>
He stopped reacting emotionally.
</p>

<p>
And he started playing with a clear understanding of risk.
</p>

<p>
The results did not become perfect.
</p>

<p>
They became consistent.
</p>

<p>
And over time, consistency beat luck.
</p>
`
},
};

// ─── Slug ↔ category map ──────────────────────────────────────────────────────

export const GUIDE_SLUGS: Record<string, ToolConfig['category']> = {
  finance: 'Finance',
  math: 'Math',
  conversions: 'Conversions',
  health: 'Health',
  'date-time': 'Date & Time',
  
  'random-generators': 'Random Generators',
  'game-calculators': 'Game Calculators',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ToolCategoryGuideProps {
  slug: string;
}

export function ToolCategoryGuide({ slug }: ToolCategoryGuideProps) {
  const category = GUIDE_SLUGS[slug];
  const content = category ? GUIDE_CONTENT[category] : null;
const tools = category && content
  ? TOOLS.filter((tool) => {
      if (!tool.available) return false;
      return content.story.includes(`href="${tool.href}"`);
    })
  : [];

  // JSON-LD structured data
  useEffect(() => {
    if (!category || !content) return;

    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://softwarecalc.com' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://softwarecalc.com/guides' },
          { '@type': 'ListItem', position: 3, name: content.title, item: `https://softwarecalc.com/guides/${slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: content.title,
        description: content.intro,
        url: `https://softwarecalc.com/guides/${slug}`,
      },
    ];

    let script = document.getElementById('guide-structured-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'guide-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);

    return () => {
      document.getElementById('guide-structured-data')?.remove();
    };
  }, [slug, category, content]);

  if (!category || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Guide not found.</p>
          <Link to="/"><Button variant="outline">Back to Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-10">

        {/* ── Breadcrumbs ── */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/guides" className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Guides</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{content.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ── Header ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {content.title}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">{content.intro}</p>
        </div>

{/* ── Story ── */}
<div className="bg-white dark:bg-zinc-900 border shadow-sm rounded-xl p-6 max-w-2xl mx-auto">
  <div
    className="space-y-5 text-base leading-relaxed text-muted-foreground"
    dangerouslySetInnerHTML={{ __html: content.story }}
  />
</div>


{/* ── Relevant Tools ── */}
{tools.length > 0 && (
  <div className="bg-muted/30 rounded-xl border p-6 space-y-4">
    <h2 className="text-lg font-semibold">
      Relevant tools in this guide
    </h2>

    <div className="grid sm:grid-cols-2 gap-2">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          to={tool.href as any}
          className="text-primary hover:underline text-sm"
        >
          {tool.name}
        </Link>
      ))}
    </div>
  </div>
)}
        
        {/* ── Footer CTA ── */}
        <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Browse all guides or explore the full tool directory.
          </p>
          <div className="flex gap-3">
            <Link to="/guides">
              <Button variant="outline" size="sm">All Guides</Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="sm">All Tools</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
