// Variables
const x = 1;
const y = 5;

console.log(x, y); // 1 5 are printed
y += 10;
console.log(x, y); // 1 15 are printed
y = "sometext";
console.log(x, y); // 1 sometext are printed
x = 4; // causes an error

// Arrays
const t = [1, -1, 3];
t.push(5);
console.log(t.length); // 4 is printed
console.log(t[1]); // -1 is printed

t.forEach((value) => {
  console.log(value); // numbers 1, -1, 3, 5 are printed, each on its own line
});

const t2 = t.concat(5); // creates new array
console.log(t); // [1, -1, 3] is printed
console.log(t2); // [1, -1, 3, 5] is printed

const m1 = t.map((value) => value * 2);
console.log(m1);

const m2 = t.map((value) => "<li>" + value + "</li>");
console.log(m2);
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

const u = [1, 2, 3, 4, 5];
const [first, second, ...rest] = u;

console.log(first, second); // 1 2 is printed
console.log(rest); // [3, 4, 5] is printed

// Objects
const object1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
};

const object2 = {
  name: "Full Stack web application development",
  level: "intermediate studies",
  size: 5,
};

const object3 = {
  name: {
    first: "Dan",
    last: "Abramov",
  },
  grades: [2, 3, 5, 3],
  department: "Stanford University",
};

console.log(object1.name); // Arto Hellas is printed
const fieldName = "age";
console.log(object1[fieldName]); // 35 is printed

object1.address = "Helsinki"; // adds new property
object1["secret number"] = 12341;

// Functions
const sum = (p1, p1) => {
  return p1 + p2;
};

const result = sum(1, 5);

// const square = p => {
//   return p * p;
// };

// const square = p => p * p

const arr = [1, 2, 3];
const arrSquared = t.map((p) => p * p);

function product(a, b) {
  return a * b;
}

const result2 = product(2, 6);

const average = function (a, b) {
  return (a + b) / 2;
};

const result3 = average(2, 5);
