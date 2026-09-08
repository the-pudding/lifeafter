// per-person body height from country + gender, via height26.csv

// the country is the prefix of selfid1 or selfid2
function countryOf(person) {
	for (const column of ["SELFID1", "SELFID2"]) {
		const raw = person[column];
		if (typeof raw === "string" && raw.includes(":")) {
			return raw.split(":")[0].trim();
		}
	}
	return null;
}

// naming mismatches between the csv and the survey
const HEIGHT_COUNTRY_ALIASES = { Türkiye: "Turkey" };

// country to male and female heights in cm, plus fallback averages
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
		// the csv's own global average row is far below the real mean
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

// spread around the country and gender mean
const HEIGHT_INDIVIDUAL_SPREAD = 0.04;
// target mean, so the average person renders unchanged
const HEIGHT_REFERENCE_SCALE = 1.05;

// averaged uniforms approximate a normal, so heights cluster
function bellRandom() {
	return (Math.random() + Math.random() + Math.random()) / 3;
}

// builds the per-person height scale used by the crowd
export function createHeightScaleFor(heightLookup) {
	const { byCountry, averages } = heightLookup;
	// the divisor that lands the crowd average on the reference scale
	const referenceCm = (averages.male + averages.female) / 2;
	return (person) => {
		const country = countryOf(person);
		const entry =
			(country && byCountry.get(HEIGHT_COUNTRY_ALIASES[country] ?? country)) ??
			averages;
		// anything but male or female takes the midpoint
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
