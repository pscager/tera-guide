// The Veil (Darkan)
//
//

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	const LEFT_SWORD_DOWN_ID = 1401;
	const RIGHT_SWORD_DOWN_ID = 1402;

	let double_back_swipe_flag = 0b0000;
	let phase_two = false;

	let boss_enraged = false;

	let first_eighty = false;
	let triple_swipes_active = false;
	let triple_swipe_remaining = 0;
	let triples_timer = null;

	let back_print = false;
	let back_time = 0;
	let end_back_time = 0;
	let is_one_back = false;


	function boss_backattack_event() {
		end_back_time = new Date() - back_time;

		if (!back_print) {
			back_print = true;
			is_one_back = end_back_time > 0 && end_back_time < 1500;

			if (is_one_back) {
				handlers.text({
					sub_type: "message",
					message_RU: "360",
					message: "360",
				});
			}
		}
		dispatch.setTimeout(() => back_print = false, 3500);
	}

	function boss_backattack_event_new(skillid, ent) {
		switch (skillid) {
			case 103:
				double_back_swipe_flag = 0b0001;
				break;
			case 105:
				if (double_back_swipe_flag === 0b0001) {
					double_back_swipe_flag |= 0b0010;
				} else {
					double_back_swipe_flag = 0b0000;
				}
				break;
			case 106:
				if (double_back_swipe_flag === 0b0011) {
					double_back_swipe_flag |= 0b0100;
				} else {
					double_back_swipe_flag = 0b0000;
				}
				break;
			case 108:
				if (double_back_swipe_flag === 0b0111) {
					double_back_swipe_flag |= 0b1000;
				} else {
					double_back_swipe_flag = 0b0000;
				}
				break;
			default:
				double_back_swipe_flag = 0b0000;
		}

		if (double_back_swipe_flag === 0b1111) {
			handlers.text({
				sub_type: "message",
				message: "3x360"
			});
		}
	}

	dispatch.hook("S_ACTION_STAGE", "*", event => {
		if (event.templateId !== 1000 || phase_two) return;
		let skillid = event.skill.id % 1000;
		boss_backattack_event_new(skillid);
	});


	function first_swipe_event(skillid, ent) {
		let double = "(Double)";
		let double_ru = "(Двойной)";

		if (triple_swipes_active) {
			if (triple_swipe_remaining > 0) {
				triple_swipe_remaining--;
			}

			if (!first_eighty || triple_swipe_remaining > 0) {
				double = "";
				double_ru = "";
			}

			if (triple_swipe_remaining === 0) {
				triple_swipes_active = false;
			}
		}

		// 1401 enraged [Left sword down]
		const leftSafe = [
			// the markers will be more reliable than the messages since the boss turns frequently during triples
			// { type: "text", class_position: ["dps", "heal"], sub_type: "message", message: `Left ${double}`, message_RU: `Левый ${double_ru}` },
			// { type: "text", class_position: "tank", sub_type: "message", message: `Right ${double}`, message_RU: `Правый ${double_ru}` },
			{ type: "spawn", func: "vector", args: [553, 360, 400, 180, 800, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 300, 100, 0, 2000, true, null] },
			{ type: "spawn", func: "marker", args: [false, 230, 100, 0, 2000, true, null] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] }
		];

		// 1402 enraged [right sword down]
		const rightSafe = [
			// the markers will be more reliable than the messages since the boss turns frequently during triples
			// { type: "text", class_position: ["dps", "heal"], sub_type: "message", message: `Right ${double}`, message_RU: `Правый ${double_ru}` },
			// { type: "text", class_position: "tank", sub_type: "message", message: `Left ${double}`, message_RU: `Левый ${double_ru}` },
			{ type: "spawn", func: "vector", args: [553, 360, 400, 180, 800, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 60, 100, 0, 2000, true, null] },
			{ type: "spawn", func: "marker", args: [false, 130, 100, 0, 2000, true, null] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] }
		];


		if (skillid === RIGHT_SWORD_DOWN_ID) {
			if (boss_enraged) {
				handlers.event(leftSafe);
			} else {
				handlers.event(rightSafe);
			}
		} else {
			// left sword down
			if (!boss_enraged) {
				handlers.event(leftSafe);
			} else {
				handlers.event(rightSafe);
			}
		}
	}

	function first_triples_notify() {
		if (triples_timer != null) {
			dispatch.clearTimeout(triples_timer);
		}

		triples_timer = dispatch.setTimeout(() => {
			handlers.text({
				sub_type: "notification",
				message: "Triples Soon!",
				message_RU: "Тройки Скоро!"
			});
		}, 80000);

	}

	function reset() {
		double_back_swipe_flag = 0b000;

		boss_enraged = false;
		phase_two = false;

		first_eighty = false;
		triple_swipes_active = false;
		triple_swipe_remaining = 0;
		triples_timer = null;

		back_print = false;
		back_time = 0;
		end_back_time = 0;
		is_one_back = false;

		if (triples_timer != null) {
			dispatch.clearTimeout(triples_timer);
			triples_timer = null;
		}
	}

	return {
		"ns-3111-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "func", func: reset },
		],
		"ns-3111-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "func", func: reset },
			{ type: "func", func: () => phase_two = true }
		],
		"h-3111-1000-79": [
			{ type: "text", sub_type: "message", message: "80%" },
			{ type: "func", func: () => first_eighty = true }
		],
		"rb-3111-1000": [{ type: "func", func: () => boss_enraged = true }],
		"re-3111-1000": [{ type: "func", func: () => boss_enraged = false }],
		"qb-3111-1000-3036039": [
			{ type: "text", sub_type: "message", message: "triples!", message_RU: "тройки!" },
			{ type: "func", func: () => triple_swipes_active = true },
			{ type: "func", func: () => triple_swipe_remaining = 3 },
			{ type: "func", func: first_triples_notify }
		],
		"s-3111-1000-1101-0": [{ type: "func", func: boss_backattack_event }],
		"s-3111-1000-1102-0": [{ type: "func", func: () => back_time = new Date() }],
		"s-3111-1000-1114-0": [
			{ type: "text", sub_type: "message", message_RU: "Таргет", message: "Target Attack" },
			{ type: "spawn", func: "vector", args: [553, 90, 150, 0, 1300, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 90, 75, 0, 1300, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 1300, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 270, 75, 0, 1300, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 270, 150, 0, 1300, 0, 2500] }
		],
		"s-3111-1000-1115-0": [
			{ type: "text", sub_type: "message", message: "3" },
			{ type: "text", sub_type: "message", delay: 1000, message: "2" },
			{ type: "text", sub_type: "message", delay: 2000, message: "1" },
			{ type: "text", sub_type: "message", delay: 3200, message_RU: "Эвейд", message: "Dodge" }
		],
		"s-3111-1000-1117-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Tank Buster", message_RU: "Удар вперед" }],
		"s-3111-1000-1302-0": [
			{ type: "text", sub_type: "message", message_RU: "АоЕ", message: "AOE" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 100, 6000] }
		],
		"s-3111-1000-1401-0": [{ type: "func", func: first_swipe_event, args: [LEFT_SWORD_DOWN_ID] }],
		"s-3111-1000-1402-0": [{ type: "func", func: first_swipe_event, args: [RIGHT_SWORD_DOWN_ID] }],
		"s-3111-2000-1401-0": "s-3111-1000-1401-0",
		"s-3111-2000-1402-0": "s-3111-1000-1402-0",
		"s-3111-1000-1303-0": [{ type: "text", sub_type: "message", message: "Spin Attack", message_RU: "Крутилка" }],
		"s-3111-1000-1806-0": [
			{ type: "text", sub_type: "message", message: "IN - OUT - IN" },
			// { type: "text", sub_type: "message", delay: 2350, message: "Dodge" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 7000] },
		],
		"s-3111-1000-1805-0": [
			{ type: "text", sub_type: "message", message: "OUT - IN - OUT" },
			// { type: "text", sub_type: "message", delay: 2350, message: "Dodge" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 7000] },
		],
		// phase 2
		"dm-0-0-3111006": [{ type: "text", sub_type: "message", message: "triples!", message_RU: "тройки!" }],
		// aliases
		"s-3111-1000-2101-0": "s-3111-1000-1101-0",
		"s-3111-1000-2102-0": "s-3111-1000-1102-0",

		"s-3111-1000-2114-0": "s-3111-1000-1114-0",
		"s-3111-1000-2115-0": "s-3111-1000-1115-0",
		"s-3111-1000-2117-0": "s-3111-1000-1117-0",
		// phase 2
		"rb-3111-2000": "rb-3111-1000",
		"re-3111-2000": "re-3111-1000",
		// back 1x360
		"s-3111-2000-1101-0": "s-3111-1000-1101-0",
		"s-3111-2000-2101-0": "s-3111-1000-1101-0",
		"s-3111-2000-1102-0": "s-3111-1000-1102-0",
		"s-3111-2000-2102-0": "s-3111-1000-1102-0",

		"s-3111-2000-1117-0": "s-3111-1000-1117-0",
		"s-3111-2000-2117-0": "s-3111-1000-1117-0",

	};
};
