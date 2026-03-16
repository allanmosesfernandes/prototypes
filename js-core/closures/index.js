/* What is a closure:
“Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.”

Closures are a fundamental concept in JavaScript (and many other programming languages), but they can be tricky to grasp at first. Let's break down the definition you provided step by step, and I'll include a practical example to make it clearer. I'll explain it in simple terms, then show how it works in code.

Breaking Down the Definition
"Closure is when a function is able to remember and access its lexical scope":

A function in JavaScript can be thought of as a "mini-program" that runs code.
Lexical scope refers to the "environment" or "context" where the function is defined. This includes variables, functions, and other things that are accessible at the time the function is written in the code (not when it's called).
The key idea is that the function "remembers" and can access variables from its surrounding scope, even if those variables are not directly inside the function itself.
"even when that function is executing outside its lexical scope":

Normally, when a function finishes running, its local variables are "forgotten" (garbage collected).
But with a closure, the function can still access variables from its original defining environment, even after that environment has "ended" or the outer function has returned.
This allows the function to "carry" its context with it, like a backpack of remembered data.
In short: A closure lets a function keep a reference to variables from where it was created, so it can use them later, no matter where or when the function is called.

Why Does This Matter?
Closures enable powerful patterns like data privacy (encapsulation), callbacks, and asynchronous programming.
They're everywhere in JavaScript: event handlers, timers, and even libraries like React rely on them.
Without closures, functions would lose access to their "birthplace" context, making many advanced features impossible.
Example in Code
Let's look at a simple example. Imagine you have an outer function that defines a variable, and an inner function that uses it. The inner function forms a closure because it "remembers" the outer variable even after the outer function exits.

function outerFunction() {
  let outerVariable = "I'm from the outer scope!";  // This is in the lexical scope of innerFunction

  function innerFunction() {
    console.log(outerVariable);  // innerFunction can access outerVariable (closure in action)
  }

  return innerFunction;  // We return the inner function, but don't call it yet
}

// Call outerFunction, which returns innerFunction (but outerFunction's scope is "done")
const myClosure = outerFunction();

// Now call the returned function. Even though outerFunction has finished,
// innerFunction still "remembers" outerVariable!
myClosure();  // Output: "I'm from the outer scope!"

Here, innerFunction is a closure: It was defined inside outerFunction, so it has access to outerVariable.
When outerFunction returns, its local scope should normally disappear, but innerFunction keeps it alive.
We can call myClosure later, and it still works because the closure preserved the context.
Common Pitfalls and Tips
Scope Confusion: Remember, it's about where the function is defined, not where it's called. If you define a function inside another, it gets a closure.
Memory Leaks: Closures can keep variables in memory longer than expected, so be mindful in long-running apps (e.g., event listeners).
Testing It Out: Try modifying the example above in your index.js file. Add the code after your comment, run it in Node.js, and see the output.
/*