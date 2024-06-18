import { formatISO } from "date-fns";

const date = (date1, date2) => {
  return `${formatISO(new Date(date1, 0, 1), {
    representation: "date",
  })},${formatISO(new Date(date2, 11, 31), { representation: "date" })}`;
};

const subDate = (date) => {
  return `${formatISO(new Date(date, 0, 1), {
    representation: "date",
  })},${formatISO(new Date(date, 11, 31), { representation: "date" })}`;
};

export const years = [
  {
    label: "2020-2024",
    value: date(2020, 2024),
    children: [
      { label: 2024, value: subDate(2024) },
      { label: 2023, value: subDate(2023) },
      { label: 2022, value: subDate(2022) },
      { label: 2021, value: subDate(2021) },
      { label: 2020, value: subDate(2020) },
    ],
  },
  {
    label: "2010-2019",
    value: date(2010, 2019),
    children: [
      { label: 2019, value: subDate(2019) },
      { label: 2018, value: subDate(2018) },
      { label: 2017, value: subDate(2017) },
      { label: 2016, value: subDate(2016) },
      { label: 2015, value: subDate(2015) },
      { label: 2014, value: subDate(2014) },
      { label: 2013, value: subDate(2013) },
      { label: 2012, value: subDate(2012) },
      { label: 2011, value: subDate(2011) },
      { label: 2010, value: subDate(2010) },
    ],
  },
  {
    label: "2000-2009",
    value: date(2000, 2009),
    children: [
      { label: 2009, value: subDate(2009) },
      { label: 2008, value: subDate(2008) },
      { label: 2007, value: subDate(2007) },
      { label: 2006, value: subDate(2006) },
      { label: 2005, value: subDate(2005) },
      { label: 2004, value: subDate(2004) },
      { label: 2003, value: subDate(2003) },
      { label: 2002, value: subDate(2002) },
      { label: 2001, value: subDate(2001) },
      { label: 2000, value: subDate(2000) },
    ],
  },
  {
    label: "1990-1999",
    value: date(1990, 1999),
    children: [
      { label: 1999, value: subDate(1999) },
      { label: 1998, value: subDate(1998) },
      { label: 1997, value: subDate(1997) },
      { label: 1996, value: subDate(1996) },
      { label: 1995, value: subDate(1995) },
      { label: 1994, value: subDate(1994) },
      { label: 1993, value: subDate(1993) },
      { label: 1992, value: subDate(1992) },
      { label: 1991, value: subDate(1991) },
      { label: 1990, value: subDate(1990) },
    ],
  },
  {
    label: "1980-1989",
    value: date(1980, 1989),
    children: [
      { label: 1989, value: subDate(1989) },
      { label: 1988, value: subDate(1988) },
      { label: 1987, value: subDate(1987) },
      { label: 1986, value: subDate(1986) },
      { label: 1985, value: subDate(1985) },
      { label: 1984, value: subDate(1984) },
      { label: 1983, value: subDate(1983) },
      { label: 1982, value: subDate(1982) },
      { label: 1981, value: subDate(1981) },
      { label: 1980, value: subDate(1980) },
    ],
  },
  {
    label: "1970-1979",
    value: date(1970, 1979),
    children: [
      { label: 1979, value: subDate(1979) },
      { label: 1978, value: subDate(1978) },
      { label: 1977, value: subDate(1977) },
      { label: 1976, value: subDate(1976) },
      { label: 1975, value: subDate(1975) },
      { label: 1974, value: subDate(1974) },
      { label: 1973, value: subDate(1973) },
      { label: 1972, value: subDate(1972) },
      { label: 1971, value: subDate(1971) },
      { label: 1970, value: subDate(1970) },
    ],
  },
  {
    label: "1960-1969",
    value: date(1960, 1969),
    children: [{ label: 1962, value: subDate(1962) }],
  },
  {
    label: "1950-1959",
    value: date(1950, 1959),
    children: [
      { label: 1958, value: subDate(1958) },
      { label: 1954, value: subDate(1954) },
    ],
  },
];
