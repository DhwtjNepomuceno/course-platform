"use client";

export const days = Array.from({ length: 31 }, (_, index) => index + 1);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = Array.from(
  { length: 2010 - 1920 + 1 },
  (_, index) => index + 1920,
);
