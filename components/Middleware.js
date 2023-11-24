// // middleware/myMiddleware.js

// export default function ({ route, redirect }) {
//   // Perform middleware logic
//   if (localStorage.getItem("role") == "1") {
//      redirect("/dashboard");
//   }
//   if (localStorage.getItem("role") == "5") {
//     redirect("/pricing");
//   } else {
//     // Redirect or prevent navigation
//     redirect("/login"); // Redirect to login page, for instance
//     // Or simply prevent navigation
//     // return;
//   }
// }
// In your router.js or where you define your routes

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  // Your routes here
});

// Example middleware function
const myMiddleware = (to, from, next) => {
  // Perform some logic here before navigating
  // For example, checking authentication, permissions, etc.
  if (localStorage.getItem("role") == "1") {
    redirect("/dashboard");
    next();
  }
  if (localStorage.getItem("role") == "5") {
    redirect("/dashboard");
    next();
  } else {
    // Redirect or prevent navigation
    next("/login"); // Redirect to login page, for instance
    // Or you can simply prevent navigation
    // next(false);
  }
};

// Global before guard (acts like middleware for all routes)
router.beforeEach((to, from, next) => {
  // Call your middleware functions here
  myMiddleware(to, from, next);
});

export default router;
