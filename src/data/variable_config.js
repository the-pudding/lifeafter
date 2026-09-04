// Editable display config for every GFS variable used by the recolor
// dropdown / minimap legend. One entry per BASE variable name — i.e.
// with the "_Y1"/"_Y2" suffix stripped, since a variable's categories,
// ranges, and colors are the same across both survey years. `columns`
// on each entry lists the actual people.json column name(s) to pull
// the raw value from (most have both _Y1 and _Y2; some retrospective/
// recruit-only questions have just _Y1; GENDER/SELFID1/SELFID2 have no
// suffix at all).
//
//   type: "categorical"
//     categories: [{ key, label, color, values }, ...]
//     `values` is the list of raw people.json strings folded into
//     that one category — this is the "truncate multiple values into
//     one category" knob. Every categorical variable ends with a
//     "No Answer" catch-all for the survey's admin codes
//     ("(Saw, skipped)", "(Refused)", "(DK)", ...).
//
//   type: "numeric"
//     valueMap maps non-numeric raw strings to a number first (many
//     0–10 scale questions render 0 and 10 as words like "Strongly
//     disagree"/"Strongly agree" instead of digits; CIGARETTES uses
//     "None/Do not smoke" -> 0, etc). Whatever's left over is parsed
//     as-is. ranges: [{ key, label, color, min, max }, ...] bucket the
//     resulting number — this is the "give ranges for each category" knob.
//
// COLOR RULE (this pass) — one shared 5-color spectrum, PALETTE, for
// every job the old three separate palettes (colors_div, colors_asc,
// colors_diverging) used to split across: ordinal scales (low -> high,
// disagree -> agree) read across it start-to-end, and purely qualitative
// variables (GENDER, MARITAL_STATUS, ...) just pick whichever 2-5 of its
// five stops read most distinctly against each other for that variable's
// own category count — nothing here is order-sensitive for those.
//
// Every stop is a fully saturated, bright color on purpose (the old
// colors_asc/colors_diverging faded their low end down into a near-black
// desaturated purple to signal "low" — but a dark, muted swatch is
// exactly the hardest kind of color to actually differentiate from
// another dark, muted swatch at a glance, which was the original
// complaint). Ordered start-to-end: warm amber/orange, coral (its own
// transitional stop), vivid purple (the midpoint), magenta (transitional
// again), bright pink.
//
// "No Answer" stays a fixed neutral gray (#55505f) and "(Does not
// apply)" stays a fixed muted plum (#4a4550) in every variable — outside
// PALETTE entirely, so they read as "no data," not as another data point
// on the spectrum.
export const PALETTE = [
  "#ffb200", // 0 — warm amber/orange
  "#ff6a5c", // 1 — coral
  "#9b4dff", // 2 — vivid purple
  "#b7227e", // 3 — magenta
  "#ff00aa"  // 4 — bright pink
];

export const PARENT_ORDER = [
	"Demographics & Background",
	"Well-Being & Life Satisfaction",
	"Mental & Physical Health",
	"Mental Health & Stress",
	"Financial & Material Stability",
	"Character & Virtue",
	"Close Social Relationships",
	"Religion & Spirituality",
	"Childhood & Family Background",
	"Personality Traits",
	"Civic & Political Views",
	"Health & Habits"
];

const NO_ANSWER_COLOR = "#55505f";
const NOT_APPLICABLE_COLOR = "#4a4550";

export const variableConfig =
{
  "GENDER": {
    "label": "Gender",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "female",
        "label": "Female",
        "color": PALETTE[4],
        "values": [
          "Female"
        ]
      },
      {
        "key": "male",
        "label": "Male",
        "color": PALETTE[1],
        "values": [
          "Male"
        ]
      },
      {
        "key": "other",
        "label": "Other",
        "color": PALETTE[0],
        "values": [
          "Other"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)",
          "Prefer not to answer"
        ]
      }
    ],
    "columns": [
      "GENDER"
    ]
  },
  // "AGE": {
  //   "label": "Age",
  //   "parent": "Demographics & Background",
  //   "type": "numeric",
  //   "valueMap": {},
  //   "ranges": [
  //     {
  //       "key": "18_44",
  //       "label": "18–44",
  //       "color": PALETTE[0],
  //       "min": 18,
  //       "max": 44
  //     },
  //     {
  //       "key": "45_64",
  //       "label": "45–64",
  //       "color": PALETTE[2],
  //       "min": 45,
  //       "max": 64
  //     },
  //     {
  //       "key": "65_plus",
  //       "label": "65+",
  //       "color": PALETTE[4],
  //       "min": 65,
  //       "max": 120
  //     }
  //   ],
  //   "columns": [
  //     "AGE_Y1",
  //     "AGE_Y2"
  //   ]
  // },
  "MARITAL_STATUS": {
    "label": "Marital Status",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "married_partnered",
        "label": "Married/Partnered",
        "color": PALETTE[4],
        "values": [
          "Married",
          "Domestic partner"
        ]
      },
      {
        "key": "single",
        "label": "Single",
        "color": PALETTE[2],
        "values": [
          "Single/Never been married"
        ]
      },
      {
        "key": "divorced_separated",
        "label": "Divorced/Separated",
        "color": PALETTE[1],
        "values": [
          "Divorced",
          "Separated"
        ]
      },
      {
        "key": "widowed",
        "label": "Widowed",
        "color": PALETTE[0],
        "values": [
          "Widowed"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "MARITAL_STATUS_Y1",
      "MARITAL_STATUS_Y2"
    ]
  },
  "EDUCATION_3": {
    "label": "Education Level",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "elementary_or_less",
        "label": "K8 or less",
        "color": PALETTE[1],
        "values": [
          "Completed elementary education or less (up to 8 years of basic education)"
        ]
      },
      {
        "key": "secondary_some_post_secondary",
        "label": "Some HS or college",
        "color": PALETTE[2],
        "values": [
          "Some secondary education, completed secondary education, or some post-secondary"
        ]
      },
      {
        "key": "completed_4_year_degree",
        "label": "4-year degree or more",
        "color": PALETTE[4],
        "values": [
          "Completed four years of education beyond high school and/or received a 4-year co"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "EDUCATION_3_Y1",
      "EDUCATION_3_Y2"
    ]
  },
  "EMPLOYMENT": {
    "label": "Employment Status",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "employed",
        "label": "Employed / Self-Employed",
        "color": PALETTE[2],
        "values": [
          "Employed for an employer",
          "Self-employed"
        ]
      },
      {
        "key": "retired",
        "label": "Retired",
        "color": PALETTE[4],
        "values": [
          "Retired"
        ]
      },
      {
        "key": "homemaker",
        "label": "Homemaker",
        "color": PALETTE[0],
        "values": [
          "Homemaker"
        ]
      },
      {
        "key": "student",
        "label": "Student",
        "color": PALETTE[1],
        "values": [
          "Student"
        ]
      },
      {
        "key": "unemployed",
        "label": "Unemployed",
        "color": PALETTE[3],
        "values": [
          "Unemployed and looking for a job"
        ]
      },
      {
        "key": "other",
        "label": "Other",
        "color": PALETTE[0],
        "values": [
          "None of these/Other"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "EMPLOYMENT_Y1",
      "EMPLOYMENT_Y2"
    ]
  },
  // "INCOME": {
  //   "label": "Household Income",
  //   "parent": "Demographics & Background",
  //   "type": "categorical",
  //   "needsManualGrouping": true,
  //   "note": "305 raw values, each a country-specific currency bracket (e.g. \"United States: $60,000 to $89,999\", \"Japan: 300,001 – 400,000 yen\"). No safe automatic bucketing across currencies — group by hand (e.g. into low/mid/high terciles per country, or convert to a common PPP-adjusted scale).",
  //   "categories": [
  //     {
  //       "key": "no_income",
  //       "label": "No Household Income",
  //       "color": PALETTE[3],
  //       "values": [
  //         "(None/No household income)"
  //       ]
  //     },
  //     {
  //       "key": "no_answer",
  //       "label": "No Answer",
  //       "color": NO_ANSWER_COLOR,
  //       "values": [
  //         "(Saw, skipped)",
  //         "(Refused)",
  //         "(DK)",
  //         "(Does NOT know household income)",
  //         "(Refused to give household income)"
  //       ]
  //     }
  //   ],
  //   "columns": [
  //     "INCOME_Y1",
  //     "INCOME_Y2"
  //   ]
  // },
  "INCOME_FEELINGS": {
    "label": "Feelings About Household Income",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "comfortable",
        "label": "Comfortable / Getting By",
        "color": PALETTE[4],
        "values": [
          "Living comfortably on present income",
          "Getting by on present income"
        ]
      },
      {
        "key": "struggling",
        "label": "Finding It Difficult",
        "color": PALETTE[1],
        "values": [
          "Finding it difficult on present income",
          "Finding it very difficult on present income"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "INCOME_FEELINGS_Y1",
      "INCOME_FEELINGS_Y2"
    ]
  },
  "NUM_CHILDREN": {
    "label": "Number of Children in Household",
    "parent": "Demographics & Background",
    "type": "numeric",
    "valueMap": {
      "None": 0
    },
    "ranges": [
      {
        "key": "0",
        "label": "0",
        "color": PALETTE[0],
        "min": 0,
        "max": 0
      },
      {
        "key": "1_2",
        "label": "1–2",
        "color": PALETTE[2],
        "min": 1,
        "max": 2
      },
      {
        "key": "3_plus",
        "label": "3+",
        "color": PALETTE[4],
        "min": 3,
        "max": 30
      }
    ],
    "columns": [
      "NUM_CHILDREN_Y1",
      "NUM_CHILDREN_Y2"
    ]
  },
  "NUM_HOUSEHOLD": {
    "label": "Number of Adults in Household",
    "parent": "Demographics & Background",
    "type": "numeric",
    "valueMap": {
      "96+": 96
    },
    "ranges": [
      {
        "key": "1",
        "label": "1",
        "color": PALETTE[0],
        "min": 1,
        "max": 1
      },
      {
        "key": "2_3",
        "label": "2–3",
        "color": PALETTE[2],
        "min": 2,
        "max": 3
      },
      {
        "key": "4_plus",
        "label": "4+",
        "color": PALETTE[4],
        "min": 4,
        "max": 100
      }
    ],
    "columns": [
      "NUM_HOUSEHOLD_Y1"
    ]
  },
  "URBAN_RURAL": {
    "label": "Urban / Rural",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "urban",
        "label": "Urban (City / Suburb)",
        "color": PALETTE[4],
        "values": [
          "A large city",
          "A suburb of a large city"
        ]
      },
      {
        "key": "rural",
        "label": "Rural / Small Town",
        "color": PALETTE[1],
        "values": [
          "A small town or village",
          "A rural area or on a farm"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "URBAN_RURAL_Y1",
      "URBAN_RURAL_Y2"
    ]
  },
  "BORN_COUNTRY": {
    "label": "Born in This Country",
    "parent": "Demographics & Background",
    "type": "categorical",
    "categories": [
      {
        "key": "born_here",
        "label": "Born Here",
        "color": PALETTE[4],
        "values": [
          "Born in this country"
        ]
      },
      {
        "key": "born_abroad",
        "label": "Born Abroad",
        "color": PALETTE[1],
        "values": [
          "Born in another country"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "BORN_COUNTRY_Y1"
    ]
  },
  "SELFID1": {
    "label": "Race / Ethnicity / Nationality (First)",
    "parent": "Demographics & Background",
    "type": "categorical",
    "needsManualGrouping": true,
    "note": "101 raw values, each prefixed with country (e.g. \"United States: White\", \"Kenya: Kikuyu\") since categories are country-specific. Group by hand, likely per-country or into cross-country themes (e.g. \"White\", \"Indigenous\", \"Asian\").",
    "categories": [
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)",
          "Prefer not to answer"
        ]
      }
    ],
    "columns": [
      "SELFID1"
    ]
  },
  "SELFID2": {
    "label": "Race / Ethnicity / Nationality (Second)",
    "parent": "Demographics & Background",
    "type": "categorical",
    "needsManualGrouping": true,
    "note": "48 raw values, country-specific like SELFID1. \"(No other response)\" means the respondent gave only one identity (SELFID1).",
    "categories": [
      {
        "key": "none",
        "label": "No Second Identity",
        "color": PALETTE[2],
        "values": [
          "(No other response)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)",
          "Prefer not to answer"
        ]
      }
    ],
    "columns": [
      "SELFID2"
    ]
  },
  "POLITICAL_ID": {
    "label": "Political Party Affiliation",
    "parent": "Civic & Political Views",
    "type": "categorical",
    "needsManualGrouping": true,
    "note": "172 raw values, each a country-specific party (e.g. \"United States: Democratic Party\", \"Sweden: The Moderate Party\"). Group by hand, e.g. per-country or by left/right/center lean.",
    "categories": [
      {
        "key": "no_party",
        "label": "Do Not Feel Close to Any Party",
        "color": PALETTE[2],
        "values": [
          "Do not feel close to any party"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)",
          "Other"
        ]
      }
    ],
    "columns": [
      "POLITICAL_ID_Y1",
      "POLITICAL_ID_Y2"
    ]
  },
  "INCOME_DIFF": {
    "label": "Govt. Should Reduce Income Differences",
    "parent": "Civic & Political Views",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Strongly disagree",
          "Somewhat disagree"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Somewhat agree",
          "Strongly agree"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "INCOME_DIFF_Y1"
    ]
  },
  "OBEY_LAW": {
    "label": "The Law Should Always Be Obeyed",
    "parent": "Civic & Political Views",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Strongly disagree",
          "Somewhat disagree"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Somewhat agree",
          "Strongly agree"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "OBEY_LAW_Y1"
    ]
  },
  "SAY_IN_GOVT": {
    "label": "People Like You Have a Say in Government",
    "parent": "Civic & Political Views",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "SAY_IN_GOVT_Y1",
      "SAY_IN_GOVT_Y2"
    ]
  },
  "DISCRIMINATED": {
    "label": "Feel Discriminated Against",
    "parent": "Civic & Political Views",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Rarely",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Rarely"
        ]
      },
      {
        "key": "often",
        "label": "Often / Always",
        "color": PALETTE[4],
        "values": [
          "Often",
          "Always"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "DISCRIMINATED_Y1",
      "DISCRIMINATED_Y2"
    ]
  },
  "AFTER_DEATH": {
    "label": "Believe in Life After Death",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
       {
        "key": "no",
        "label": "No",
        "color": PALETTE[0],
        "values": [
          "No"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
       {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      }
    
      // ,
      // {
      //   "key": "no_answer",
      //   "label": "No Answer",
      //   "color": NO_ANSWER_COLOR,
      //   "values": [
      //     "(Saw, skipped)",
      //     "(Refused)",
      //     "(DK)"
      //   ]
      // }
    ],
    "columns": [
      "AFTER_DEATH_Y1",
      "AFTER_DEATH_Y2"
    ]
  },
  "ATTEND_SVCS": {
    "label": "How Often You Attend Religious Services",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / A Few Times a Year",
        "color": PALETTE[0],
        "values": [
          "Never",
          "A few times a year"
        ]
      },
      {
        "key": "monthly",
        "label": "1–3 Times a Month",
        "color": PALETTE[2],
        "values": [
          "One to three times a month"
        ]
      },
      {
        "key": "weekly_plus",
        "label": "Weekly or More",
        "color": PALETTE[4],
        "values": [
          "Once a week",
          "More than once a week"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "ATTEND_SVCS_Y1",
      "ATTEND_SVCS_Y2"
    ]
  },
   "BELIEVE_GOD_BROAD": {
    "label": "Belief in god(s)?",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "god_belief",
        "label": "One or more god(s)",
        "color": PALETTE[2],
        "values": [
          "One God",
          "More than one god"
        ]
      },
      {
        "key": "impersonal_spiritual_force",
        "label": "Impersonal Spiritual Force",
        "color": PALETTE[0],
        "values": [
          "An impersonal spiritual force"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[1],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "none_of_these",
        "label": "No/No answer",
        "color": PALETTE[3],
        "values": [
          "None of these",
           "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "BELIEVE_GOD_Y1",
      "BELIEVE_GOD_Y2"
    ]
  },
  "BELIEVE_GOD": {
    "label": "Specific belief about god(s)",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "one_god",
        "label": "One God",
        "color": PALETTE[2],
        "values": [
          "One God"
        ]
      },
      {
        "key": "more_than_one_god",
        "label": "More Than One God",
        "color": PALETTE[4],
        "values": [
          "More than one god"
        ]
      },
      {
        "key": "impersonal_spiritual_force",
        "label": "Impersonal Spiritual Force",
        "color": PALETTE[0],
        "values": [
          "An impersonal spiritual force"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[1],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "none_of_these",
        "label": "None of These",
        "color": PALETTE[3],
        "values": [
          "None of these"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "BELIEVE_GOD_Y1",
      "BELIEVE_GOD_Y2"
    ]
  },
 
  "COMFORT_REL": {
    "label": "Find Comfort in Religion/Spirituality",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "not_relevant_not_religious",
        "label": "Not Relevant / Not Religious",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "Not relevant"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "COMFORT_REL_Y1",
      "COMFORT_REL_Y2"
    ]
  },
  "CONNECTED_REL": {
    "label": "Feel Connected to Religion/Spirituality",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Rarely",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Rarely"
        ]
      },
      {
        "key": "often",
        "label": "Often / Always",
        "color": PALETTE[4],
        "values": [
          "Often",
          "Always"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "CONNECTED_REL_Y1",
      "CONNECTED_REL_Y2"
    ]
  },
  "CRITICAL": {
    "label": "Religious Community is Critical of You",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "not_relevant_not_religious",
        "label": "Not Relevant / Not Religious",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "Not relevant"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "CRITICAL_Y1",
      "CRITICAL_Y2"
    ]
  },
  "GOD_PUNISH": {
    "label": "Feel God/Spiritual Force is Punishing You",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "not_relevant_not_religious",
        "label": "Not Relevant / Not Religious",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "Not relevant"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "GOD_PUNISH_Y1",
      "GOD_PUNISH_Y2"
    ]
  },
  "GROUP_NOT_REL": {
    "label": "Participate in Non-Religious Groups",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / A Few Times a Year",
        "color": PALETTE[0],
        "values": [
          "Never",
          "A few times a year"
        ]
      },
      {
        "key": "monthly",
        "label": "1–3 Times a Month",
        "color": PALETTE[2],
        "values": [
          "One to three times a month"
        ]
      },
      {
        "key": "weekly_plus",
        "label": "Weekly or More",
        "color": PALETTE[4],
        "values": [
          "Once a week",
          "More than once a week"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "GROUP_NOT_REL_Y1",
      "GROUP_NOT_REL_Y2"
    ]
  },
  "LIFE_APPROACH": {
    "label": "Religion Lies Behind Your Approach to Life",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "not_relevant_not_religious",
        "label": "Not Relevant / Not Religious",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "Not relevant"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "LIFE_APPROACH_Y1",
      "LIFE_APPROACH_Y2"
    ]
  },
  "LOVED_BY_GOD": {
    "label": "Feel Loved by God/Spiritual Force",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "not_relevant_not_religious",
        "label": "Not Relevant / Not Religious",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "Not relevant"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "LOVED_BY_GOD_Y1",
      "LOVED_BY_GOD_Y2"
    ]
  },
  "PRAY_MEDITATE": {
    "label": "How Often You Pray or Meditate",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Sometimes",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Sometimes"
        ]
      },
      {
        "key": "daily",
        "label": "About Once a Day or More",
        "color": PALETTE[4],
        "values": [
          "About once a day",
          "More than once a day"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "PRAY_MEDITATE_Y1",
      "PRAY_MEDITATE_Y2"
    ]
  },
  "REL_EXPERIENC": {
    "label": "Had a Profound Religious/Spiritual Experience",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL_EXPERIENC_Y1",
      "REL_EXPERIENC_Y2"
    ]
  },
  "REL_IMPORTANT": {
    "label": "Religion is Important in Your Daily Life",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL_IMPORTANT_Y1"
    ]
  },
  "REL1": {
    "label": "Religion at Age Twelve",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "christianity",
        "label": "Christianity",
        "color": PALETTE[2],
        "values": [
          "Christianity"
        ]
      },
      {
        "key": "islam",
        "label": "Islam",
        "color": PALETTE[4],
        "values": [
          "Islam"
        ]
      },
      {
        "key": "hinduism",
        "label": "Hinduism",
        "color": PALETTE[0],
        "values": [
          "Hinduism"
        ]
      },
      {
        "key": "buddhism",
        "label": "Buddhism",
        "color": PALETTE[1],
        "values": [
          "Buddhism"
        ]
      },
      {
        "key": "judaism",
        "label": "Judaism",
        "color": PALETTE[3],
        "values": [
          "Judaism"
        ]
      },
      {
        "key": "none",
        "label": "No Religion / Atheist / Agnostic",
        "color": PALETTE[0],
        "values": [
          "No religion/Atheist/Agnostic"
        ]
      },
      {
        "key": "other",
        "label": "Other Religion",
        "color": PALETTE[2],
        "values": [
          "Some other religion",
          "Primal, Animist, or Folk religion",
          "Umbanda, Candomblé, and other African-derived religions",
          "Taoism",
          "Spiritism",
          "Chinese folk/traditional religion",
          "Sikhism",
          "Shinto",
          "Confucianism"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL1_Y1"
    ]
  },
  "REL2": {
    "label": "Current Religion",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "christianity",
        "label": "Christianity",
        "color": PALETTE[2],
        "values": [
          "Christianity"
        ]
      },
      {
        "key": "islam",
        "label": "Islam",
        "color": PALETTE[4],
        "values": [
          "Islam"
        ]
      },
      {
        "key": "hinduism",
        "label": "Hinduism",
        "color": PALETTE[0],
        "values": [
          "Hinduism"
        ]
      },
      {
        "key": "buddhism",
        "label": "Buddhism",
        "color": PALETTE[1],
        "values": [
          "Buddhism"
        ]
      },
      {
        "key": "judaism",
        "label": "Judaism",
        "color": PALETTE[3],
        "values": [
          "Judaism"
        ]
      },
      {
        "key": "none",
        "label": "No Religion / Atheist / Agnostic",
        "color": PALETTE[0],
        "values": [
          "No religion/Atheist/Agnostic"
        ]
      },
      {
        "key": "other",
        "label": "Other Religion",
        "color": PALETTE[2],
        "values": [
          "Some other religion",
          "Primal, Animist, or Folk religion",
          "Umbanda, Candomblé, and other African-derived religions",
          "Taoism",
          "Spiritism",
          "Chinese folk/traditional religion",
          "Sikhism",
          "Shinto",
          "Confucianism"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL2_Y1",
      "REL2_Y2"
    ]
  },
  "RELIGIOUS_AFFILIATION": {
    "label": "Religiously Affiliated vs. Unaffiliated",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "unaffiliated",
        "label": "No Religion / Atheist / Agnostic",
        "color": PALETTE[0],
        "values": [
          "No religion/Atheist/Agnostic"
        ]
      },
      {
        "key": "affiliated",
        "label": "Religiously Affiliated",
        "color": PALETTE[4],
        "values": [
          "Christianity",
          "Islam",
          "Hinduism",
          "Buddhism",
          "Judaism",
          "Some other religion",
          "Primal, Animist, or Folk religion",
          "Umbanda, Candomblé, and other African-derived religions",
          "Taoism",
          "Spiritism",
          "Chinese folk/traditional religion",
          "Sikhism",
          "Shinto",
          "Confucianism"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL2_Y1",
      "REL2_Y2"
    ]
  },
  "REL3": {
    "label": "Christian Denomination",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "needsManualGrouping": true,
    "note": "17 denominations (Catholic, Lutheran, Baptist, Pentecostal, etc). Only asked of Christians (REL2). Consider grouping into Catholic / Mainline Protestant / Evangelical-Pentecostal / Orthodox / Other.",
    "categories": [
      {
        "key": "catholic",
        "label": "Catholic",
        "color": PALETTE[2],
        "values": [
          "Catholic"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL3_Y1",
      "REL3_Y2"
    ]
  },
  "REL7": {
    "label": "Atheist, Agnostic, or Neither",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "atheist",
        "label": "Atheist",
        "color": PALETTE[2],
        "values": [
          "Atheist – do not believe in any god"
        ]
      },
      {
        "key": "agnostic",
        "label": "Agnostic",
        "color": PALETTE[4],
        "values": [
          "Agnostic – unsure whether a God or gods exist"
        ]
      },
      {
        "key": "neither",
        "label": "Neither",
        "color": PALETTE[0],
        "values": [
          "Neither"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL7_Y1"
    ]
  },
  "REL8": {
    "label": "Spiritual, Religious, Both, or Neither",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "religious",
        "label": "Religious",
        "color": PALETTE[2],
        "values": [
          "Religious"
        ]
      },
      {
        "key": "spiritual",
        "label": "Spiritual",
        "color": PALETTE[4],
        "values": [
          "Spiritual"
        ]
      },
      {
        "key": "both",
        "label": "Both",
        "color": PALETTE[0],
        "values": [
          "Both"
        ]
      },
      {
        "key": "neither",
        "label": "Neither",
        "color": PALETTE[1],
        "values": [
          "Neither"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "REL8_Y1"
    ]
  },
  "SACRED_TEXTS": {
    "label": "Read or Listen to Sacred Texts",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Sometimes",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Sometimes"
        ]
      },
      {
        "key": "daily",
        "label": "About Once a Day or More",
        "color": PALETTE[4],
        "values": [
          "About once a day",
          "More than once a day"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "SACRED_TEXTS_Y1",
      "SACRED_TEXTS_Y2"
    ]
  },
  "TELL_BELIEFS": {
    "label": "Tell Others About Your Religion/Spirituality",
    "parent": "Religion & Spirituality",
    "type": "categorical",
    "categories": [
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree"
        ]
      },
      {
        "key": "unsure",
        "label": "Unsure",
        "color": PALETTE[2],
        "values": [
          "Unsure"
        ]
      },
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree"
        ]
      },
      {
        "key": "not_relevant_not_religious",
        "label": "Not Relevant / Not Religious",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "Not relevant"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TELL_BELIEFS_Y1",
      "TELL_BELIEFS_Y2"
    ]
  },
  // "CNTRY_REL_BUD": {
  //   "label": "Teachings of Buddhism Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_BUD_Y1"
  //   ]
  // },
  // "CNTRY_REL_CHI": {
  //   "label": "Teachings of Chinese Folk Religion Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_CHI_Y1"
  //   ]
  // },
  // "CNTRY_REL_CHR": {
  //   "label": "Teachings of Christianity Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_CHR_Y1"
  //   ]
  // },
  // "CNTRY_REL_HIN": {
  //   "label": "Teachings of Hinduism Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_HIN_Y1"
  //   ]
  // },
  // "CNTRY_REL_ISL": {
  //   "label": "Teachings of Islam Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_ISL_Y1"
  //   ]
  // },
  // "CNTRY_REL_JUD": {
  //   "label": "Teachings of Judaism Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_JUD_Y1"
  //   ]
  // },
  // "CNTRY_REL_SHI": {
  //   "label": "Teachings of Shinto Are Important (Country-Level)",
  //   "parent": "Religion & Spirituality",
  //   "type": "numeric",
  //   "valueMap": {
  //     "Strongly disagree": 0,
  //     "Strongly agree": 10
  //   },
  //   "ranges": [
  //     {
  //       "key": "low",
  //       "label": "Low (0–3)",
  //       "color": PALETTE[0],
  //       "min": 0,
  //       "max": 3
  //     },
  //     {
  //       "key": "mid",
  //       "label": "Medium (4–6)",
  //       "color": PALETTE[2],
  //       "min": 4,
  //       "max": 6
  //     },
  //     {
  //       "key": "high",
  //       "label": "High (7–10)",
  //       "color": PALETTE[4],
  //       "min": 7,
  //       "max": 10
  //     }
  //   ],
  //   "columns": [
  //     "CNTRY_REL_SHI_Y1"
  //   ]
  // },
  "LIFE_SAT": {
    "label": "Satisfaction With Life as a Whole",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Not at all satisfied with your life": 0,
      "Completely satisfied with your life": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "LIFE_SAT_Y1",
      "LIFE_SAT_Y2"
    ]
  },
  "HAPPY": {
    "label": "How Happy You Usually Feel",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Extremely unhappy": 0,
      "Extremely happy": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "HAPPY_Y1",
      "HAPPY_Y2"
    ]
  },
  "WB_TODAY": {
    "label": "Life Evaluation: Today",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Worst possible": 0,
      "Best possible": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "WB_TODAY_Y1",
      "WB_TODAY_Y2"
    ]
  },
  "WB_FIVEYRS": {
    "label": "Life Evaluation: Five Years From Now",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Worst possible": 0,
      "Best possible": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "WB_FIVEYRS_Y1",
      "WB_FIVEYRS_Y2"
    ]
  },
  "CONTENT": {
    "label": "Content With Friendships and Relationships",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "CONTENT_Y1",
      "CONTENT_Y2"
    ]
  },
  "LIFE_PURPOSE": {
    "label": "Understand Your Purpose in Life",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "LIFE_PURPOSE_Y1",
      "LIFE_PURPOSE_Y2"
    ]
  },
  "WORTHWHILE": {
    "label": "Things You Do Are Worthwhile",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Not at all worthwhile": 0,
      "Completely worthwhile": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "WORTHWHILE_Y1",
      "WORTHWHILE_Y2"
    ]
  },
  "PEACE": {
    "label": "At Peace With Your Thoughts and Feelings",
    "parent": "Well-Being & Life Satisfaction",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Rarely",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Rarely"
        ]
      },
      {
        "key": "often",
        "label": "Often / Always",
        "color": PALETTE[4],
        "values": [
          "Often",
          "Always"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "PEACE_Y1",
      "PEACE_Y2"
    ]
  },
  "HOPE_FUTURE": {
    "label": "Always Remain Hopeful About the Future",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "HOPE_FUTURE_Y1",
      "HOPE_FUTURE_Y2"
    ]
  },
  "EXPECT_GOOD": {
    "label": "Expect More Good Things Than Bad",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "EXPECT_GOOD_Y1",
      "EXPECT_GOOD_Y2"
    ]
  },
  "CAPABLE": {
    "label": "Feel Very Capable in Most Things You Do",
    "parent": "Well-Being & Life Satisfaction",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Rarely",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Rarely"
        ]
      },
      {
        "key": "often",
        "label": "Often / Always",
        "color": PALETTE[4],
        "values": [
          "Often",
          "Always"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "CAPABLE_Y1",
      "CAPABLE_Y2"
    ]
  },
  "FORGIVE": {
    "label": "How Often You Have Forgiven Those Who Hurt You",
    "parent": "Character & Virtue",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Rarely",
        "color": PALETTE[1],
        "values": [
          "Never",
          "Rarely"
        ]
      },
      {
        "key": "often",
        "label": "Often / Always",
        "color": PALETTE[4],
        "values": [
          "Often",
          "Always"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "FORGIVE_Y1",
      "FORGIVE_Y2"
    ]
  },
  "GIVE_UP": {
    "label": "Give Up Happiness Now for Greater Happiness Later",
    "parent": "Character & Virtue",
    "type": "numeric",
    "valueMap": {
      "Not true of you at all": 0,
      "Completely true of you": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "GIVE_UP_Y1",
      "GIVE_UP_Y2"
    ]
  },
  "GRATEFUL": {
    "label": "Long List of Things You Feel Grateful For",
    "parent": "Character & Virtue",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "GRATEFUL_Y1",
      "GRATEFUL_Y2"
    ]
  },
  "PROMOTE_GOOD": {
    "label": "Always Act to Promote Good",
    "parent": "Character & Virtue",
    "type": "numeric",
    "valueMap": {
      "Not true of you at all": 0,
      "Completely true of you": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "PROMOTE_GOOD_Y1",
      "PROMOTE_GOOD_Y2"
    ]
  },
  "HELP_STRANGER": {
    "label": "Helped a Stranger in the Past Month",
    "parent": "Character & Virtue",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "HELP_STRANGER_Y1",
      "HELP_STRANGER_Y2"
    ]
  },
  "DONATED": {
    "label": "Donated Money to Charity in Past Month",
    "parent": "Character & Virtue",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "DONATED_Y1",
      "DONATED_Y2"
    ]
  },
  "VOLUNTEERED": {
    "label": "Volunteered Time in Past Month",
    "parent": "Character & Virtue",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "VOLUNTEERED_Y1",
      "VOLUNTEERED_Y2"
    ]
  },
  "MENTAL_HEALTH": {
    "label": "Self-Rated Mental Health",
    "parent": "Mental & Physical Health",
    "type": "numeric",
    "valueMap": {
      "Poor mental health": 0,
      "Excellent mental health": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "MENTAL_HEALTH_Y1",
      "MENTAL_HEALTH_Y2"
    ]
  },
  "PHYSICAL_HLTH": {
    "label": "Self-Rated Physical Health",
    "parent": "Mental & Physical Health",
    "type": "numeric",
    "valueMap": {
      "Poor physical health": 0,
      "Excellent physical health": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "PHYSICAL_HLTH_Y1",
      "PHYSICAL_HLTH_Y2"
    ]
  },
  "HEALTH_PROB": {
    "label": "Health Problems Limit Daily Activities",
    "parent": "Mental & Physical Health",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "HEALTH_PROB_Y1",
      "HEALTH_PROB_Y2"
    ]
  },
  "BODILY_PAIN": {
    "label": "Bodily Pain in Past 4 Weeks",
    "parent": "Mental & Physical Health",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "None at All / Not Very Much",
        "color": PALETTE[1],
        "values": [
          "None at all",
          "Not very much"
        ]
      },
      {
        "key": "high",
        "label": "Some / A Lot",
        "color": PALETTE[4],
        "values": [
          "Some",
          "A lot"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "BODILY_PAIN_Y1",
      "BODILY_PAIN_Y2"
    ]
  },
  "SUFFERING": {
    "label": "The Extent to Which You Are Suffering",
    "parent": "Mental & Physical Health",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "Not at All / Not Very Much",
        "color": PALETTE[1],
        "values": [
          "Not at all",
          "Not very much"
        ]
      },
      {
        "key": "high",
        "label": "Some / A Lot",
        "color": PALETTE[4],
        "values": [
          "Some",
          "A lot"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "SUFFERING_Y1",
      "SUFFERING_Y2"
    ]
  },
  "COVID_DEATH": {
    "label": "Family/Friend Died From COVID-19",
    "parent": "Mental & Physical Health",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "COVID_DEATH_Y1"
    ]
  },
  "DEPRESSED": {
    "label": "Feeling Down, Depressed, or Hopeless",
    "parent": "Mental Health & Stress",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "Not at All / Several Days",
        "color": PALETTE[1],
        "values": [
          "Not at all",
          "Several days"
        ]
      },
      {
        "key": "high",
        "label": "More Than Half the Days / Nearly Every Day",
        "color": PALETTE[4],
        "values": [
          "More than half the days",
          "Nearly every day"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "DEPRESSED_Y1",
      "DEPRESSED_Y2"
    ]
  },
  "FEEL_ANXIOUS": {
    "label": "Feeling Nervous, Anxious, or on Edge",
    "parent": "Mental Health & Stress",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "Not at All / Several Days",
        "color": PALETTE[1],
        "values": [
          "Not at all",
          "Several days"
        ]
      },
      {
        "key": "high",
        "label": "More Than Half the Days / Nearly Every Day",
        "color": PALETTE[4],
        "values": [
          "More than half the days",
          "Nearly every day"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "FEEL_ANXIOUS_Y1",
      "FEEL_ANXIOUS_Y2"
    ]
  },
  "CONTROL_WORRY": {
    "label": "Not Able to Stop or Control Worrying",
    "parent": "Mental Health & Stress",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "Not at All / Several Days",
        "color": PALETTE[1],
        "values": [
          "Not at all",
          "Several days"
        ]
      },
      {
        "key": "high",
        "label": "More Than Half the Days / Nearly Every Day",
        "color": PALETTE[4],
        "values": [
          "More than half the days",
          "Nearly every day"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "CONTROL_WORRY_Y1",
      "CONTROL_WORRY_Y2"
    ]
  },
  "LONELY": {
    "label": "How Often You Feel Lonely",
    "parent": "Mental Health & Stress",
    "type": "numeric",
    "valueMap": {
      "Never": 0,
      "Always": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "LONELY_Y1",
      "LONELY_Y2"
    ]
  },
  "THREAT_LIFE": {
    "label": "Bothered by Biggest Threat to Life Witnessed",
    "parent": "Mental Health & Stress",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "Not at All / Not Very Much",
        "color": PALETTE[1],
        "values": [
          "Not at all",
          "Not very much"
        ]
      },
      {
        "key": "high",
        "label": "Some / A Lot",
        "color": PALETTE[4],
        "values": [
          "Some",
          "A lot"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "THREAT_LIFE_Y1",
      "THREAT_LIFE_Y2"
    ]
  },
  "EXPENSES": {
    "label": "Worry About Meeting Monthly Expenses",
    "parent": "Financial & Material Stability",
    "type": "numeric",
    "valueMap": {
      "Do not ever worry": 0,
      "Worry all of the time": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "EXPENSES_Y1",
      "EXPENSES_Y2"
    ]
  },
  "WORRY_SAFETY": {
    "label": "Worry About Safety, Food, or Housing",
    "parent": "Financial & Material Stability",
    "type": "numeric",
    "valueMap": {
      "Do not ever worry": 0,
      "Worry all of the time": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "WORRY_SAFETY_Y1",
      "WORRY_SAFETY_Y2"
    ]
  },
  "CIGARETTES": {
    "label": "Cigarettes Smoked Per Day",
    "parent": "Health & Habits",
    "type": "numeric",
    "valueMap": {
      "None/Do not smoke": 0
    },
    "ranges": [
      {
        "key": "0",
        "label": "None",
        "color": PALETTE[0],
        "min": 0,
        "max": 0
      },
      {
        "key": "1_19",
        "label": "1–19",
        "color": PALETTE[2],
        "min": 1,
        "max": 19
      },
      {
        "key": "20_plus",
        "label": "20+",
        "color": PALETTE[4],
        "min": 20,
        "max": 100
      }
    ],
    "columns": [
      "CIGARETTES_Y1",
      "CIGARETTES_Y2"
    ]
  },
  "DRINKS": {
    "label": "Alcoholic Drinks in Past 7 Days",
    "parent": "Health & Habits",
    "type": "numeric",
    "valueMap": {
      "None/Do not drink alcoholic beverages": 0,
      "97+": 97
    },
    "ranges": [
      {
        "key": "0",
        "label": "None",
        "color": PALETTE[0],
        "min": 0,
        "max": 0
      },
      {
        "key": "1_7",
        "label": "1–7",
        "color": PALETTE[2],
        "min": 1,
        "max": 7
      },
      {
        "key": "8_plus",
        "label": "8+",
        "color": PALETTE[4],
        "min": 8,
        "max": 100
      }
    ],
    "columns": [
      "DRINKS_Y1",
      "DRINKS_Y2"
    ]
  },
  "DAYS_EXERCISE": {
    "label": "Days Exercised in Past Week",
    "parent": "Health & Habits",
    "type": "numeric",
    "valueMap": {
      "0 days": 0,
      "1 day": 1,
      "2 days": 2,
      "3 days": 3,
      "4 days": 4,
      "5 days": 5,
      "6 days": 6,
      "7 days/Every day": 7
    },
    "ranges": [
      {
        "key": "0",
        "label": "0 Days",
        "color": PALETTE[0],
        "min": 0,
        "max": 0
      },
      {
        "key": "1_4",
        "label": "1–4 Days",
        "color": PALETTE[2],
        "min": 1,
        "max": 4
      },
      {
        "key": "5_7",
        "label": "5–7 Days",
        "color": PALETTE[4],
        "min": 5,
        "max": 7
      }
    ],
    "columns": [
      "DAYS_EXERCISE_Y1",
      "DAYS_EXERCISE_Y2"
    ]
  },
  "CLOSE_TO": {
    "label": "Know One Special Person You Feel Close To",
    "parent": "Close Social Relationships",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "CLOSE_TO_Y1",
      "CLOSE_TO_Y2"
    ]
  },
  "SAT_RELATNSHP": {
    "label": "Relationships Are as Satisfying as You Want",
    "parent": "Close Social Relationships",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "SAT_RELATNSHP_Y1",
      "SAT_RELATNSHP_Y2"
    ]
  },
  "SHOW_LOVE": {
    "label": "Show Someone You Love or Care for Them",
    "parent": "Close Social Relationships",
    "type": "numeric",
    "valueMap": {
      "Never": 0,
      "Always": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "SHOW_LOVE_Y1",
      "SHOW_LOVE_Y2"
    ]
  },
  "PEOPLE_HELP": {
    "label": "Could Count on People to Help if in Trouble",
    "parent": "Close Social Relationships",
    "type": "numeric",
    "valueMap": {
      "Never": 0,
      "Always": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "PEOPLE_HELP_Y1",
      "PEOPLE_HELP_Y2"
    ]
  },
  "BELONGING": {
    "label": "Sense of Belonging in Your Country",
    "parent": "Close Social Relationships",
    "type": "numeric",
    "valueMap": {
      "Very weak": 0,
      "Very strong": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "BELONGING_Y1",
      "BELONGING_Y2"
    ]
  },
  "TRUST_PEOPLE": {
    "label": "People in This Country Trust One Another",
    "parent": "Close Social Relationships",
    "type": "categorical",
    "categories": [
      {
        "key": "low",
        "label": "None / Not Very Many",
        "color": PALETTE[0],
        "values": [
          "None",
          "Not very many"
        ]
      },
      {
        "key": "medium",
        "label": "Some",
        "color": PALETTE[2],
        "values": [
          "Some"
        ]
      },
      {
        "key": "high",
        "label": "Most / All",
        "color": PALETTE[4],
        "values": [
          "Most",
          "All"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRUST_PEOPLE_Y1",
      "TRUST_PEOPLE_Y2"
    ]
  },
  "FATHER_LOVED": {
    "label": "Felt Loved by Your Father Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "FATHER_LOVED_Y1"
    ]
  },
  "MOTHER_LOVED": {
    "label": "Felt Loved by Your Mother Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "MOTHER_LOVED_Y1"
    ]
  },
  "FATHER_RELATN": {
    "label": "Relationship With Your Father Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "good",
        "label": "Very Good / Somewhat Good",
        "color": PALETTE[4],
        "values": [
          "Very good",
          "Somewhat good"
        ]
      },
      {
        "key": "bad",
        "label": "Somewhat Bad / Very Bad",
        "color": PALETTE[1],
        "values": [
          "Somewhat bad",
          "Very bad"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "FATHER_RELATN_Y1"
    ]
  },
  "MOTHER_RELATN": {
    "label": "Relationship With Your Mother Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "good",
        "label": "Very Good / Somewhat Good",
        "color": PALETTE[4],
        "values": [
          "Very good",
          "Somewhat good"
        ]
      },
      {
        "key": "bad",
        "label": "Somewhat Bad / Very Bad",
        "color": PALETTE[1],
        "values": [
          "Somewhat bad",
          "Very bad"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "MOTHER_RELATN_Y1"
    ]
  },
  "HEALTH_GROWUP": {
    "label": "Your Health When Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "high",
        "label": "Excellent / Very Good",
        "color": PALETTE[4],
        "values": [
          "Excellent",
          "Very good"
        ]
      },
      {
        "key": "medium",
        "label": "Good",
        "color": PALETTE[2],
        "values": [
          "Good"
        ]
      },
      {
        "key": "low",
        "label": "Fair / Poor",
        "color": PALETTE[0],
        "values": [
          "Fair",
          "Poor"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "HEALTH_GROWUP_Y1"
    ]
  },
  "OUTSIDER": {
    "label": "Felt Like an Outsider in Your Family Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "yes",
        "label": "Yes",
        "color": PALETTE[4],
        "values": [
          "Yes"
        ]
      },
      {
        "key": "no",
        "label": "No",
        "color": PALETTE[1],
        "values": [
          "No"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "OUTSIDER_Y1"
    ]
  },
  "INCOME_12YRS": {
    "label": "Feelings About Household Income Growing Up",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "comfortable",
        "label": "Lived Comfortably / Got By",
        "color": PALETTE[1],
        "values": [
          "Lived comfortably",
          "Got by"
        ]
      },
      {
        "key": "struggling",
        "label": "Found It Difficult / Very Difficult",
        "color": PALETTE[4],
        "values": [
          "Found it difficult",
          "Found it very difficult"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "INCOME_12YRS_Y1"
    ]
  },
  "SVCS_12YRS": {
    "label": "Religious Attendance at Age Twelve",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Less Than Once a Month",
        "color": PALETTE[0],
        "values": [
          "Never",
          "Less than once a month"
        ]
      },
      {
        "key": "monthly",
        "label": "1–3 Times a Month",
        "color": PALETTE[2],
        "values": [
          "One to three times a month"
        ]
      },
      {
        "key": "weekly_plus",
        "label": "At Least Once a Week",
        "color": PALETTE[4],
        "values": [
          "At least once a week"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "SVCS_12YRS_Y1"
    ]
  },
  "SVCS_FATHER": {
    "label": "Father's Religious Attendance When You Were 12",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Less Than Once a Month",
        "color": PALETTE[0],
        "values": [
          "Never",
          "Less than once a month"
        ]
      },
      {
        "key": "monthly",
        "label": "1–3 Times a Month",
        "color": PALETTE[2],
        "values": [
          "One to three times a month"
        ]
      },
      {
        "key": "weekly_plus",
        "label": "At Least Once a Week",
        "color": PALETTE[4],
        "values": [
          "At least once a week"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "SVCS_FATHER_Y1"
    ]
  },
  "SVCS_MOTHER": {
    "label": "Mother's Religious Attendance When You Were 12",
    "parent": "Childhood & Family Background",
    "type": "categorical",
    "categories": [
      {
        "key": "rarely",
        "label": "Never / Less Than Once a Month",
        "color": PALETTE[0],
        "values": [
          "Never",
          "Less than once a month"
        ]
      },
      {
        "key": "monthly",
        "label": "1–3 Times a Month",
        "color": PALETTE[2],
        "values": [
          "One to three times a month"
        ]
      },
      {
        "key": "weekly_plus",
        "label": "At Least Once a Week",
        "color": PALETTE[4],
        "values": [
          "At least once a week"
        ]
      },
      {
        "key": "not_applicable",
        "label": "Not Applicable",
        "color": NOT_APPLICABLE_COLOR,
        "values": [
          "(Does not apply)"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "SVCS_MOTHER_Y1"
    ]
  },
  "TRAITS1": {
    "label": "Trait Pair: Extroverted, Enthusiastic",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS1_Y1"
    ]
  },
  "TRAITS2": {
    "label": "Trait Pair: Critical, Quarrelsome",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS2_Y1"
    ]
  },
  "TRAITS3": {
    "label": "Trait Pair: Dependable, Self-Disciplined",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS3_Y1"
    ]
  },
  "TRAITS4": {
    "label": "Trait Pair: Anxious, Easily Upset",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS4_Y1"
    ]
  },
  "TRAITS5": {
    "label": "Trait Pair: Open to New Experiences, Complex",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS5_Y1"
    ]
  },
  "TRAITS6": {
    "label": "Trait Pair: Reserved, Quiet",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS6_Y1"
    ]
  },
  "TRAITS7": {
    "label": "Trait Pair: Sympathetic, Warm",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS7_Y1"
    ]
  },
  "TRAITS8": {
    "label": "Trait Pair: Disorganized, Careless",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS8_Y1"
    ]
  },
  "TRAITS9": {
    "label": "Trait Pair: Calm, Emotionally Stable",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS9_Y1"
    ]
  },
  "TRAITS10": {
    "label": "Trait Pair: Conventional, Uncreative",
    "parent": "Personality Traits",
    "type": "categorical",
    "categories": [
      {
        "key": "disagree",
        "label": "Disagree",
        "color": PALETTE[0],
        "values": [
          "Disagree strongly",
          "Disagree moderately",
          "Disagree a little"
        ]
      },
      {
        "key": "neutral",
        "label": "Neutral",
        "color": PALETTE[2],
        "values": [
          "Neither agree nor disagree"
        ]
      },
      {
        "key": "agree",
        "label": "Agree",
        "color": PALETTE[4],
        "values": [
          "Agree a little",
          "Agree moderately",
          "Agree strongly"
        ]
      },
      {
        "key": "no_answer",
        "label": "No Answer",
        "color": NO_ANSWER_COLOR,
        "values": [
          "(Saw, skipped)",
          "(Refused)",
          "(DK)"
        ]
      }
    ],
    "columns": [
      "TRAITS10_Y1"
    ]
  },
  "FREEDOM": {
    "label": "Freedom to Pursue What's Important to You",
    "parent": "Well-Being & Life Satisfaction",
    "type": "numeric",
    "valueMap": {
      "Strongly disagree": 0,
      "Strongly agree": 10
    },
    "ranges": [
      {
        "key": "low",
        "label": "Low (0–3)",
        "color": PALETTE[0],
        "min": 0,
        "max": 3
      },
      {
        "key": "mid",
        "label": "Medium (4–6)",
        "color": PALETTE[2],
        "min": 4,
        "max": 6
      },
      {
        "key": "high",
        "label": "High (7–10)",
        "color": PALETTE[4],
        "min": 7,
        "max": 10
      }
    ],
    "columns": [
      "FREEDOM_Y1",
      "FREEDOM_Y2"
    ]
  }
}
;

// --- Gradient scales ---------------------------------------------------
//
// PALETTE above is for telling categories APART. Anything with an order to
// it — every numeric range, and every categorical whose categories run
// low->high, never->always, disagree->agree, no->yes — reads better as one
// continuous ramp, so those get GRADIENT_PALETTE instead: dark purple at
// the low end through to bright pink at the high end. A scale's colors are
// sampled evenly across the ramp, however many buckets it has, so a 2-value
// yes/no lands on the two endpoints and a 5-bucket scale spreads across all
// of it.
//
// The dark end stops at a deep purple rather than going near-black: the room
// itself is near-black, and a body or minimap dot below roughly this
// lightness stops reading as a color at all.
export const GRADIENT_PALETTE = [
	"#52187d", // dark purple
	"#7a2299",
	"#a52aa2",
	"#d62c9f",
	"#ff00aa" // bright pink
];

// blends two hex colors; t = 0 -> a, 1 -> b
function mixHex(a, b, t) {
	const parse = (hex) => [
		parseInt(hex.slice(1, 3), 16),
		parseInt(hex.slice(3, 5), 16),
		parseInt(hex.slice(5, 7), 16)
	];
	const [ar, ag, ab] = parse(a);
	const [br, bg, bb] = parse(b);
	const channel = (x, y) => Math.round(x + (y - x) * t);
	return `#${[channel(ar, br), channel(ag, bg), channel(ab, bb)]
		.map((v) => v.toString(16).padStart(2, "0"))
		.join("")}`;
}

/** Color at position `t` (0-1) along GRADIENT_PALETTE. */
export function gradientColorAt(t) {
	const clamped = Math.min(1, Math.max(0, t));
	const scaled = clamped * (GRADIENT_PALETTE.length - 1);
	const low = Math.floor(scaled);
	const high = Math.min(GRADIENT_PALETTE.length - 1, low + 1);
	return mixHex(GRADIENT_PALETTE[low], GRADIENT_PALETTE[high], scaled - low);
}

/** `count` colors spread evenly across the ramp, endpoints included. */
export function gradientScale(count) {
	if (count <= 1) return [GRADIENT_PALETTE[GRADIENT_PALETTE.length - 1]];
	return Array.from({ length: count }, (_, i) => gradientColorAt(i / (count - 1)));
}

// Variables with no inherent order — identity, religion, employment, and
// the like. A ramp would imply a low-to-high reading that isn't there, so
// these keep PALETTE's distinct stops.
const QUALITATIVE_VARS = new Set([
	"GENDER",
	"MARITAL_STATUS",
	"EMPLOYMENT",
	"SELFID1",
	"SELFID2",
	"REL1",
	"REL2",
	"REL3",
	"REL7",
	"REL8",
	"BELIEVE_GOD",
	"BELIEVE_GOD_BROAD",
	"POLITICAL_ID",
	// the room is built around this one: the doors, legend and story copy
	// all key off amber/purple/pink, so it is skipped entirely above
	"AFTER_DEATH"
]);

// Pick order for the qualitative variables above. Coral sits last on
// purpose: against bright pink it's the one pair that reads as the same
// color at a glance, so it only comes out once a variable has more
// categories than there are distinct stops.
const QUALITATIVE_ORDER = [
	PALETTE[4], // bright pink
	PALETTE[0], // warm amber
	PALETTE[2], // vivid purple
	PALETTE[3], // magenta
	PALETTE[1] // coral
];

// --- Bucketing ---------------------------------------------------------
//
// The `values` arrays above fold several raw answers into one category.
// That folding only earns its keep once a variable has enough answers to
// be unreadable otherwise, so it's re-derived here:
//
//   <= MAX_UNGROUPED_ANSWERS raw answers -> no folding at all, one
//     category per answer, labelled with the answer itself
//   more than that -> folded into even groups, preferring the most groups
//     that divide the answers exactly (4, then 3, then 2)
//
// Numeric variables aren't folded at all — they're a continuous ramp, see
// gradientColorForValue below. Qualitative variables aren't either: their
// categories have no order, so "consecutive groups" would be meaningless.
const MAX_UNGROUPED_ANSWERS = 4;
const GROUP_TARGETS = [4, 3, 2];

// most groups that divide n exactly; failing that, the most groups
function groupCountFor(n) {
	return GROUP_TARGETS.find((k) => n % k === 0) ?? GROUP_TARGETS[0];
}

// n consecutive chunks whose sizes differ by at most one
function evenChunks(items, count) {
	const chunks = [];
	const base = Math.floor(items.length / count);
	let remainder = items.length % count;
	let start = 0;
	for (let i = 0; i < count; i++) {
		const size = base + (remainder > 0 ? 1 : 0);
		if (remainder > 0) remainder--;
		chunks.push(items.slice(start, start + size));
		start += size;
	}
	return chunks;
}

// admin codes ("(Refused)", "(Does not apply)") sit outside the scale.
// the label test catches buckets that mix a real answer in with the admin
// codes but still announce themselves as the no-answer bucket
function isAdminBucket(bucket) {
	return (
		bucket.key === "no_answer" ||
		/no answer/i.test(bucket.label ?? "") ||
		bucket.color === NO_ANSWER_COLOR ||
		bucket.color === NOT_APPLICABLE_COLOR
	);
}

// Read off the hand-authored entries before anything below rewrites them:
//
//   handGrouped — a category folding this many raw answers is a deliberate
//     grouping ("Religiously Affiliated" over 14 religions), not an
//     ordinal fold, and regrouping it into even chunks is nonsense
//   brightFirst — the author put the palette's bright end on the FIRST
//     category, i.e. listed the scale high -> low ("Yes | No"). the ramp
//     has to be flipped for those, so bright always means the high end
const HAND_GROUPED_MIN_VALUES = 4;
const scaleIntent = new Map();
for (const [baseVar, config] of Object.entries(variableConfig)) {
	const buckets = config.type === "numeric" ? config.ranges : config.categories;
	if (!buckets) continue;
	const scale = buckets.filter((bucket) => !isAdminBucket(bucket));
	const paletteIndex = (bucket) => PALETTE.indexOf(bucket.color);
	scaleIntent.set(baseVar, {
		handGrouped: scale.some(
			(bucket) => (bucket.values?.length ?? 0) >= HAND_GROUPED_MIN_VALUES
		),
		brightFirst:
			scale.length > 1 && paletteIndex(scale[0]) > paletteIndex(scale[scale.length - 1])
	});
}

function chunkLabel(chunk) {
	if (chunk.length === 1) return chunk[0];
	if (chunk.length === 2) return `${chunk[0]} / ${chunk[1]}`;
	return `${chunk[0]} – ${chunk[chunk.length - 1]}`;
}

for (const [baseVar, config] of Object.entries(variableConfig)) {
	// the room is built around AFTER_DEATH's own three buckets
	if (baseVar === "AFTER_DEATH") continue;
	if (config.type !== "categorical" || !config.categories) continue;
	if (QUALITATIVE_VARS.has(baseVar)) continue;
	// a deliberate grouping stays exactly as written
	if (scaleIntent.get(baseVar)?.handGrouped) continue;

	const adminBuckets = config.categories.filter(isAdminBucket);
	// flattened in the order the config lists them, which is the scale's
	// own low -> high order
	const answers = [];
	for (const bucket of config.categories) {
		if (isAdminBucket(bucket)) continue;
		for (const value of bucket.values ?? []) {
			if (!answers.includes(value)) answers.push(value);
		}
	}
	if (answers.length === 0) continue;

	const chunks =
		answers.length <= MAX_UNGROUPED_ANSWERS
			? answers.map((value) => [value])
			: evenChunks(answers, groupCountFor(answers.length));

	config.categories = [
		...chunks.map((chunk, i) => ({
			key: `group_${i + 1}`,
			label: chunkLabel(chunk),
			// overwritten by the color pass below
			color: PALETTE[0],
			values: chunk
		})),
		...adminBuckets
	];
}

// Repaint every ordered scale onto the ramp, and every qualitative one
// onto the pick order above. Runs once at module load, so the entries
// above stay readable as "which values fold into which bucket" without a
// hand-picked color on all ~300 of them.
for (const [baseVar, config] of Object.entries(variableConfig)) {
	// the room's own variable keeps its hand-set door colors
	if (baseVar === "AFTER_DEATH") continue;
	const buckets = config.type === "numeric" ? config.ranges : config.categories;
	if (!buckets) continue;
	// admin codes aren't part of the scale and keep their fixed neutrals
	const scaleBuckets = buckets.filter(
		(bucket) =>
			bucket.key !== "no_answer" &&
			bucket.color !== NO_ANSWER_COLOR &&
			bucket.color !== NOT_APPLICABLE_COLOR
	);
	let colors;
	if (QUALITATIVE_VARS.has(baseVar)) {
		colors = scaleBuckets.map(
			(_, i) => QUALITATIVE_ORDER[i % QUALITATIVE_ORDER.length]
		);
	} else {
		colors = gradientScale(scaleBuckets.length);
		// listed high -> low, so the bright end belongs at the front
		if (scaleIntent.get(baseVar)?.brightFirst) colors.reverse();
	}
	scaleBuckets.forEach((bucket, i) => {
		bucket.color = colors[i];
	});

	// every no-answer bucket reads as missing data, in the same gray —
	// including ones the entries above had given a palette color.
	// "(Does not apply)" keeps its own muted plum, which is a different
	// statement from "they didn't answer"
	for (const bucket of buckets) {
		if (!isAdminBucket(bucket)) continue;
		if (bucket.color === NOT_APPLICABLE_COLOR) continue;
		bucket.color = NO_ANSWER_COLOR;
	}
}

// --- Helpers for consuming the config above ---------------------------

// A numeric variable's full span. The top bucket is sometimes an
// open-ended catch-all ("3+", "20+") whose stated max is arbitrary —
// detected by comparing its span to the bucket below it; if it's much
// wider, its start is the real ceiling.
export function numericScale(baseVar) {
	const config = variableConfig[baseVar];
	if (config?.type !== "numeric" || !config.ranges?.length) return null;
	const sorted = [...config.ranges].sort((a, b) => a.min - b.min);
	const last = sorted[sorted.length - 1];
	const secondLast = sorted[sorted.length - 2];
	let max = last.max;
	if (secondLast) {
		const lastSpan = last.max - last.min;
		const secondLastSpan = secondLast.max - secondLast.min || 1;
		if (lastSpan > secondLastSpan * 3) max = last.min;
	}
	const min = Math.min(...sorted.map((range) => range.min));
	return max > min ? { min, max } : null;
}

/**
 * A numeric answer's color, sampled continuously along the ramp rather
 * than snapped to a range bucket — a 0-10 scale reads as a gradient, not
 * as three steps. Null for missing/unparseable values.
 */
export function gradientColorForValue(baseVar, rawValue) {
	const scale = numericScale(baseVar);
	if (!scale) return null;
	const value = parseNumericValue(baseVar, rawValue);
	if (value === null) return null;
	return gradientColorAt((value - scale.min) / (scale.max - scale.min));
}

/** The actual people.json column name(s) for a base variable, e.g. "AGE" -> ["AGE_Y1","AGE_Y2"]. */
export function getColumns(baseVar) {
	return variableConfig[baseVar]?.columns ?? [];
}

/**
 * The one column for a base variable that matches the given wave — null if
 * this variable has no column at all. Variables with only a single column
 * (no suffix, like GENDER, or a recruit-only "_Y1"-only question like REL1)
 * aren't really wave-specific, so that one column is returned for either wave.
 */
export function columnForWave(baseVar, waveKey) {
	const columns = getColumns(baseVar);
	if (columns.length <= 1) return columns[0] ?? null;
	return columns.find((column) => column.endsWith(`_${waveKey}`)) ?? null;
}

/** For a numeric variable: raw people.json value -> number, or null if unmapped/unparseable. */
export function parseNumericValue(baseVar, rawValue) {
	const config = variableConfig[baseVar];
	if (!config || config.type !== "numeric" || rawValue === null || rawValue === undefined) {
		return null;
	}
	if (typeof rawValue === "number") return rawValue;
	if (rawValue in config.valueMap) return config.valueMap[rawValue];
	const parsed = Number(rawValue);
	return Number.isFinite(parsed) ? parsed : null;
}

/** For a numeric variable: raw people.json value -> its range bucket, or null. */
export function getRangeFor(baseVar, rawValue) {
	const config = variableConfig[baseVar];
	if (!config || config.type !== "numeric") return null;
	const num = parseNumericValue(baseVar, rawValue);
	if (num === null) return null;
	return config.ranges.find((range) => num >= range.min && num <= range.max) ?? null;
}

/** For a categorical variable: raw people.json value -> its category bucket, or null. */
export function getCategoryFor(baseVar, rawValue) {
	const config = variableConfig[baseVar];
	if (!config || config.type !== "categorical") return null;
	return config.categories.find((category) => category.values.includes(rawValue)) ?? null;
}

/** The display color for a raw people.json value, regardless of variable type. */
export function colorFor(baseVar, rawValue) {
	const config = variableConfig[baseVar];
	if (!config) return null;
	const bucket =
		config.type === "numeric" ? getRangeFor(baseVar, rawValue) : getCategoryFor(baseVar, rawValue);
	return bucket?.color ?? null;
}

/** Dropdown options grouped by parent, in PARENT_ORDER, for a pulldown menu. */
export function groupedVariableOptions() {
	const byParent = new Map(PARENT_ORDER.map((parent) => [parent, []]));
	for (const [key, config] of Object.entries(variableConfig)) {
		if (!byParent.has(config.parent)) byParent.set(config.parent, []);
		byParent.get(config.parent).push({ key, label: config.label });
	}
	return PARENT_ORDER.map((parent) => ({ parent, options: byParent.get(parent) ?? [] })).filter(
		(group) => group.options.length > 0
	);
}