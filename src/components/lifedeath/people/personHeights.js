// per-person body height from country + gender, via height26.csv

// country = prefix of SELFID1/SELFID2
function countryOf(person) {
	for (const column of ["SELFID1", "SELFID2"]) {
		const raw = person[column];
		if (typeof raw === "string" && raw.includes(":")) {
			return raw.split(":")[0].trim();
		}
	}
	return null;
}

// CSV-vs-survey naming mismatches. missing countries fall through to the average
const HEIGHT_COUNTRY_ALIASES = { Türkiye: "Turkey" };

// country -> { male, female } cm, plus fallback averages
export function buildHeightLookup(rows) {
	const byCountry = new Map();
	let maleSum = 0;
	let femaleSum = 0;
	let count = 0;
	for (const row of rows) {
		const country = row.country?.trim();
		const male = Number(row.AverageHeightBoysAge19_2019);
		const female = Number(row.AverageHeightGirlsAge19_2019);
		if (!country || !Number.isFinite(male) || !Number.isFinite(female))
			continue;
		// CSV's "Global Average" row is far below the real mean. skipped
		if (country === "Global Average") continue;
		byCountry.set(country, { male, female });
		maleSum += male;
		femaleSum += female;
		count += 1;
	}
	const averages =
		count > 0
			? { male: maleSum / count, female: femaleSum / count }
			: { male: 173, female: 161 };
	return { byCountry, averages };
}

// individual spread around the country+gender mean. ~real (SD ~7cm)
const HEIGHT_INDIVIDUAL_SPREAD = 0.04;
// target mean scale, so the average person renders unchanged
const HEIGHT_REFERENCE_SCALE = 1.05;

// averaged uniforms ~ normal, so heights cluster near the mean
function bellRandom() {
	return (Math.random() + Math.random() + Math.random()) / 3;
}

// -> per-person height-scale fn used by the crowd sim
export function createHeightScaleFor(heightLookup) {
	const { byCountry, averages } = heightLookup;
	// divisor landing the crowd average on HEIGHT_REFERENCE_SCALE
	const referenceCm = (averages.male + averages.female) / 2;
	return (person) => {
		const country = countryOf(person);
		const entry =
			(country && byCountry.get(HEIGHT_COUNTRY_ALIASES[country] ?? country)) ??
			averages;
		// not Male/Female -> midpoint
		const cm =
			person.GENDER === "Male"
				? entry.male
				: person.GENDER === "Female"
					? entry.female
					: (entry.male + entry.female) / 2;
		const variation = 1 + (bellRandom() - 0.5) * 2 * HEIGHT_INDIVIDUAL_SPREAD;
		return (cm / referenceCm) * HEIGHT_REFERENCE_SCALE * variation;
	};
}
