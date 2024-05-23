// Rift's Edge (Hard) (10-Person)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let shining = false;

	function skilld_event(skillid, ent) {
		if ([1109, 2109].includes(skillid)) {
			if (!shining) {
				handlers.text({ sub_type: "message", message: "Move out", message_RU: "Выйти" });
				shining = true;
			}
			dispatch.setTimeout(() => shining = false, 10000);
		}
	}

	return {
		// 1 BOSS
		"nd-450-1001": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-450-1001-1102-0": [{ type: "text", sub_type: "message", message: "Spin", message_RU: "Крутилка" }],
		"s-450-1001-1103-0": [{ type: "text", sub_type: "message", message: "Floor", message_RU: "Атака в пол" }],
		"s-450-1001-1105-0": [
			{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 375, 0, 4000] }
		],
		"s-450-1001-1109-0": [{ type: "func", func: skilld_event, args: [1109] }],
		"s-450-1001-1110-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],
		"s-450-1001-2102-0": [{ type: "text", sub_type: "message", message: "Spin", message_RU: "Крутилка" }],
		"s-450-1001-2103-0": [{ type: "text", sub_type: "message", message: "Floor", message_RU: "Атака в пол" }],
		"s-450-1001-2105-0": [
			{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 375, 0, 4000] }
		],
		"s-450-1001-2109-0": [{ type: "func", func: skilld_event, args: [2109] }],
		"s-450-1001-2110-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],

		// 2 BOSS
		"nd-450-1002": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-450-45016-1308-0": [
			{ type: "text", sub_type: "message", message: "Circle of poison", message_RU: "Ядовитый круг" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 400, 100, 8000] },
			{ type: "spawn", id: 513, sub_delay: 99999999, pos: { x: -23072, y: 176198, z: -875 } }
		],
		"s-450-1002-1101-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Right", message_RU: "Право" }],
		"s-450-1002-1102-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Left", message_RU: "Лево" }],
		"s-450-1002-1105-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Double handed", message_RU: "Две руки" }],
		"s-450-1002-1106-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Stun", message_RU: "Стан" }],
		"s-450-1002-1107-0": [{ type: "text", sub_type: "message", message: "Flying attack", message_RU: "Летающая атака" }],
		"s-450-1002-1202-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],
		"s-450-1002-2101-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Right", message_RU: "Право" }],
		"s-450-1002-2102-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Left", message_RU: "Лево" }],
		"s-450-1002-2105-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Double handed", message_RU: "Две руки" }],
		"s-450-1002-2106-0": [{ type: "text", "class_position": "tank", sub_type: "message", message: "Stun", message_RU: "Стан" }],
		"s-450-1002-2107-0": [{ type: "text", sub_type: "message", message: "Flying attack", message_RU: "Летающая атака" }],
		"s-450-1002-2202-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],
		"s-450-1002-1108-0": [{ type: "text", sub_type: "message", message: "Overpower", message_RU: "Подавление" }],
		"s-450-1002-2108-0": [{ type: "text", sub_type: "message", message: "Overpower", message_RU: "Подавление" }],
		"s-450-1002-2104-0": [
			{ type: "text", sub_type: "message", message: "Pull", message_RU: "Стяжка" },
			{ type: "text", sub_type: "message", "delay": 3000, message: "Dodge", message_RU: "Эвейд" }
		],
		"s-450-1002-1104-0": [
			{ type: "text", sub_type: "message", message: "Pull", message_RU: "Стяжка" },
			{ type: "text", sub_type: "message", "delay": 3000, message: "Dodge", message_RU: "Эвейд" }
		],

		// 3 BOSS
		"nd-450-1003": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-450-1003-1106-0": [{ type: "text", sub_type: "message", message: "Dive", message_RU: "Ныряние" }],
		"s-450-1003-1107-0": [{ type: "text", sub_type: "message", message: "Spray poison", message_RU: "Ядовитый спрей" }],
		"s-450-1003-1301-0": [{ type: "text", sub_type: "message", message: "Crystal 1", message_RU: "Кристалл 1" }],
		"s-450-1003-1302-0": [{ type: "text", sub_type: "message", message: "Crystal 2", message_RU: "Кристалл 2" }],
		"s-450-1003-1303-0": [{ type: "text", sub_type: "message", message: "Crystal 3", message_RU: "Кристалл 3" }],
		"s-450-1003-1306-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],
		"s-450-1003-1309-0": [{ type: "text", sub_type: "message", message: "Broken shield", message_RU: "Сломать щит" }],
		"s-450-1003-2106-0": [{ type: "text", sub_type: "message", message: "Dive", message_RU: "Ныряние" }],
		"s-450-1003-2107-0": [{ type: "text", sub_type: "message", message: "Spray poison", message_RU: "Ядовитый спрей" }],
		"s-450-1003-2301-0": [
			{ type: "text", sub_type: "message", message: "Hit Crystal column", message_RU: "Кристальная колонна" },
			{ type: "text", sub_type: "message", "delay": 5000, message: "Move", message_RU: "Двигаться" }
		],
		"s-450-1003-2302-0": [{ type: "text", sub_type: "message", message: "Crystal 2", message_RU: "Кристалл 2" }],
		"s-450-1003-2303-0": [{ type: "text", sub_type: "message", message: "Crystal 3 ", message_RU: "Кристалл 3" }],
		"s-450-1003-2306-0": [{ type: "text", sub_type: "message", message: "Keep away", message_RU: "Держаться дальше" }]
	};
};