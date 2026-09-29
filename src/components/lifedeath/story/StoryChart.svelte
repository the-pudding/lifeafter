<script>
	// the small line chart under a story beat, sized off its container
	let { name, caption = null, subcaption = null, age = null } = $props();

	// each x bucket's age span, for the you-are-here marker
	const BUCKET_AGES = [
		[18, 30],
		[30, 40],
		[40, 50],
		[50, 60],
		[60, 70],
		[70, 90]
	];

	// series drawn in a supporting role, next to a colored focal group
	const REF = "rgba(255, 255, 255, 0.55)";

	// weighted GFS panel figures; null = cell too thin to draw
	const DECADES = ["18–29", "30s", "40s", "50s", "60s", "70+"];
	// `description`: the overall trend in words, for screen readers
	const CHARTS = {
		"CHANGE_BELIEF-AGE-LINE": {
			caption: "People who changed their beliefs about the afterlife",
			description:
				"The share of adults who changed their answer falls steadily with age, from 34% of adults under 30 to 23% of those 70 and older.",
			// purple matches the room's "changed answer" legend color
			series: [{ name: "All adults", color: "#c964ff", values: [34.0, 30.8, 28.6, 26.1, 24.6, 22.6] }]
		},
		"BELIEF-WITHOUT-RELIGION-LINE": {
			caption: "People who believe in an afterlife but say religion isn't important in their lives",
			description:
				"The two lines move in opposite directions with age: in Western countries the share falls from 46% of adults under 30 to 24% of those 70 and older, while in non-Western countries it rises from 13% to 27%.",
			series: [
				{ name: "Western countries", color: "#ff00aa", values: [45.9, 40.7, 39.2, 34.7, 28.8, 23.9] },
				{ name: "Non-Western countries", color: "#c964ff", values: [13.0, 15.9, 18.0, 22.1, 24.5, 26.8] }
			]
		},
		"AFTERLIFE-ATTEND_SVCS-LINE": {
			caption: "Afterlife belief, by regular church attendance",
			description:
				"Among weekly attenders, belief rises with age from 69% of adults under 30 to 81% of those 70 and older. Among less-frequent attenders it stays near 38-39% before dropping to 29% at 70 and older.",
			series: [
				{ name: "Attend weekly or more", color: "#ff00aa", values: [69.4, 72.9, 74.6, 77.8, 80.3, 80.5] },
				{ name: "Less than weekly", color: REF, values: [39.7, 37.9, 38.9, 39.3, 37.4, 29.0] }
			]
		},
		"CHANGE-THREAT-LINE": {
			caption:
				"Who changed their afterlife belief, by how much life-threatening experiences bothered them",
			description:
				"Both groups change their answers less as they age, but people still bothered a lot by the worst threat to their life change more at every age — falling from 36% of adults under 30 to 26% at 70 and older, versus 33% to 22% for those not bothered at all.",
			series: [
				{ name: "Bothered “a lot”", color: "#ffd863", values: [36.0, 34.4, 33.2, 31.5, 30.4, 25.7] },
				{ name: "“Not at all”", color: "#c964ff", values: [33.1, 30.4, 26.4, 25.2, 21.7, 22.0] }
			]
		},
		"CHANGE-ATTEND_SVCS-LINE": {
			caption: "Changing afterlife belief, by regular church attendance",
			description:
				"Among weekly attenders, changing answers falls sharply with age, from 34% of adults under 30 to 16% of those 70 and older. Among less-frequent attenders it declines more slowly, from 34% to 25%.",
			series: [
				{ name: "Attend weekly or more", color: "#ffd863", values: [33.9, 30.4, 26.7, 22.3, 19.1, 15.6] },
				{ name: "Less than weekly", color: "#c964ff", values: [34.1, 31.0, 29.4, 27.4, 26.5, 24.8] }
			]
		},
		"CHANGE-WIDOWED-LINE": {
			caption: "Changing afterlife belief, by marital status",
			description:
				"Widowed people start out far more likely to change their answer — 42% in their 30s versus 31% for everyone else — but the gap closes with age, and by their 70s both groups sit near 21-23%.",
			series: [
				{ name: "Widowed", color: "#00e5cc", values: [null, 42.3, 34.4, 30.8, 25.8, 21.0] },
				{ name: "Everyone else", color: REF, values: [34.0, 30.8, 28.5, 25.9, 24.5, 23.1] }
			]
		},
		"CHANGE-DEPRESSED-LINE": {
			caption: "Changing afterlife belief, by depression levels",
			description:
				"People with frequent depression keep changing their answers late into life, staying near 30-38% at every age, while everyone else declines steadily from 33% of adults under 30 to 22% of those 70 and older.",
			series: [
				{ name: "Frequent depression", color: "#ffd863", values: [38.1, 33.3, 31.7, 29.5, 31.9, 30.1] },
				{ name: "Everyone else", color: "#c964ff", values: [32.5, 30.1, 27.8, 25.4, 23.4, 21.9] }
			]
		},
		"UNSURE-CHANGE-LINE": {
			caption: "Where unsure people move",
			description:
				"With age, unsure people increasingly stay unsure — rising from 56% of adults under 30 to 69% of those 70 and older. Moves toward belief fall from 25% to 14%, while moves toward disbelief hold near 17-20%.",
			// the zones' own colors: yes amber, unsure purple, no magenta
			series: [
				{ name: "Stayed unsure", color: "#c964ff", values: [55.5, 58.8, 61.5, 64.2, 64.8, 69.0] },
				{ name: "Moved to belief", color: "#ffd863", values: [25.0, 21.4, 21.0, 18.8, 17.7, 14.1] },
				{ name: "Moved to disbelief", color: "#ff00aa", values: [19.4, 19.8, 17.5, 17.0, 17.5, 16.9] }
			]
		},
		"CHANGE-UNSURE-LINE": {
			caption: "Changing afterlife belief for the unsure",
			description:
				"People who are unsure change their answers more than everyone else at every age. Both decline with age: from 45% versus 31% among adults under 30, to 31% versus 19% at 70 and older.",
			series: [
				{ name: "Unsure at first answer", color: "#c964ff", values: [44.5, 41.2, 38.5, 35.8, 35.2, 31.0] },
				{ name: "Everyone else", color: REF, values: [30.6, 27.4, 25.1, 22.5, 20.5, 19.1] }
			]
		}
	};
	const chart = $derived(CHARTS[name] ?? null);
	const shownCaption = $derived.by(() => {
		const raw = caption?.trim() || chart?.caption || "";
		// doc captions sometimes arrive shouting; settle them to sentence case
		if (raw && raw === raw.toUpperCase() && raw !== raw.toLowerCase()) {
			return raw[0] + raw.slice(1).toLowerCase();
		}
		return raw;
	});

	// geometry in real pixels, from the measured width
	let width = $state(0);
	const HEIGHT = 132;
	const PAD = { top: 22, right: 40, bottom: 20, left: 10 };

	const geo = $derived.by(() => {
		if (!chart || width < 120) return null;
		const innerW = width - PAD.left - PAD.right;
		const innerH = HEIGHT - PAD.top - PAD.bottom;
		const all = chart.series.flatMap((s) => s.values).filter((v) => v !== null);
		const lo = Math.min(...all) - 4;
		const hi = Math.max(...all) + 3;
		const n = DECADES.length;
		const x = (i) => PAD.left + (i / (n - 1)) * innerW;
		const y = (v) => PAD.top + (1 - (v - lo) / (hi - lo)) * innerH;

		const lines = chart.series.map((s) => {
			const points = s.values
				.map((v, i) => (v === null ? null : { x: x(i), y: y(v), v, i }))
				.filter(Boolean);
			// the path restarts after a null, so thin cells leave a gap
			let path = "";
			s.values.forEach((v, i) => {
				if (v === null) return;
				const prev = i > 0 ? s.values[i - 1] : null;
				path += `${path === "" || prev === null ? "M" : "L"}${x(i)},${y(v)} `;
			});
			const first = points[0];
			const last = points[points.length - 1];
			return { ...s, points, path, ends: [first, last] };
		});

		// endpoint value labels: keep same-side labels at least 13px apart
		const labels = [];
		for (const side of [0, 1]) {
			const group = lines
				.map((line) => {
					const p = line.ends[side];
					return { p, color: line.color, y: p.y - 8, side };
				})
				.sort((a, b) => a.y - b.y);
			for (let i = 1; i < group.length; i++) {
				// a pushed label drops below its own point, clear of the line
				if (group[i].y < group[i - 1].y + 13) {
					group[i].y = Math.max(group[i - 1].y + 13, group[i].p.y + 17);
				}
			}
			labels.push(...group);
		}
		const ticks = DECADES.map((label, i) => ({ label, x: x(i), i }));

		// the walker's age as a fractional bucket index; each tick anchors
		// its decade's start, so the line tracks the minimap's age exactly
		let marker = null;
		let markerBucket = null;
		if (typeof age === "number") {
			let frac = 0;
			for (let i = 0; i < BUCKET_AGES.length; i++) {
				const [lo, hi] = BUCKET_AGES[i];
				if (age >= hi && i < BUCKET_AGES.length - 1) continue;
				frac = i + (age - lo) / (hi - lo);
				markerBucket = i;
				break;
			}
			marker = x(Math.min(Math.max(frac, 0), n - 1));
		}
		return { lines, labels, ticks, marker, markerBucket };
	});
</script>

{#if chart}
	<figure class="story-chart" bind:clientWidth={width}>
		<figcaption>
			{shownCaption}
			{#if subcaption}<span class="subhed">{subcaption}</span>{/if}
		</figcaption>
		{#if chart.description}
			<p class="sr-only">{chart.description}</p>
		{/if}
		{#if chart.series.length > 1}
			<div class="legend">
				{#each chart.series as s}
					<span class="key"><i style:background={s.color}></i>{s.name}</span>
				{/each}
			</div>
		{/if}
		{#if geo}
			<!-- the figcaption and trend description carry the chart's meaning -->
			<svg width={width} height={HEIGHT} aria-hidden="true">
				{#if geo.marker !== null}
					<!-- where the walker stands, on the chart's own age axis -->
					<line
						x1={geo.marker}
						y1={PAD.top - 12}
						x2={geo.marker}
						y2={HEIGHT - PAD.bottom + 4}
						stroke="rgba(255, 255, 255, 0.45)"
						stroke-width="1"
					/>
				{/if}
				{#each geo.lines as line}
					<!-- dark under-stroke keeps lines legible over bright crowds -->
					<path d={line.path} fill="none" stroke="rgba(8, 4, 14, 0.7)" stroke-width="5" stroke-linejoin="round" />
					<path d={line.path} fill="none" stroke={line.color} stroke-width="2" stroke-linejoin="round" />
					{#each line.points as p}
						<circle cx={p.x} cy={p.y} r="4.5" fill="rgba(8, 4, 14, 0.7)" />
						<circle cx={p.x} cy={p.y} r="3" fill={line.color} />
					{/each}
				{/each}
				<!-- narrow screens keep a strict every-other cadence of ticks,
				     phased so the walker's own decade is always labeled -->
				{#each geo.ticks as t}
					{#if width >= 430 || t.i % 2 === (geo.markerBucket ?? 0) % 2}
						<text class="tick" x={t.x} y={HEIGHT - 4} text-anchor={t.i === 0 ? "start" : t.i === geo.ticks.length - 1 ? "end" : "middle"}>{t.label}</text>
					{/if}
				{/each}
				<!-- endpoint values carry the scale, so no axis is needed -->
				{#each geo.labels as l}
					<text
						class="value"
						x={l.p.x + (l.side === 0 ? 0 : 6)}
						y={l.y}
						fill={l.color}
						text-anchor={l.side === 0 ? "start" : "middle"}>{l.p.v.toFixed(0)}%</text>
				{/each}
			</svg>
		{/if}
	</figure>
{/if}

<style>
	.story-chart {
		margin: 0.75em 0 0.25em;
		padding: 0;
	}
	.story-chart,
	text {
		font-family: var(--font-sans);
	}
	figcaption {
		font-size: calc(13.5px * var(--text-scale, 1));
		font-weight: 600;
		letter-spacing: 0.02em;
		color: rgba(255, 255, 255, 0.85);
		margin-bottom: 7px;
	}
	/* visually hidden, still read by screen readers */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	/* the axis ticks' own size and color, under the headline */
	.subhed {
		display: block;
		font-size: calc(10.5px * var(--text-scale, 1));
		font-weight: 400;
		letter-spacing: normal;
		color: rgba(255, 255, 255, 0.55);
		margin-top: 1px;
	}
	@media (max-width: 600px) {
		figcaption {
			font-size: calc(12px * var(--text-scale, 1));
		}
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 2px 12px;
		margin: 2px 0 0;
	}
	.key {
		font-size: calc(12px * var(--text-scale, 1));
		color: rgba(255, 255, 255, 0.8);
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.key i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		display: inline-block;
	}
	svg {
		display: block;
	}
	figcaption,
	.key,
	text {
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
	}
	.value {
		font-size: calc(12px * var(--text-scale, 1));
		font-weight: 700;
	}
	.tick {
		font-size: calc(10.5px * var(--text-scale, 1));
		fill: rgba(255, 255, 255, 0.55);
	}
</style>
