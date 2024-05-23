// Rift"s Edge (10-Person)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	return {
		// 1 BOSS
		"nd-750-1001": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-750-1001-1102-0": [{ type: "text", sub_type: "message", message: "Spin", message_RU: "Крутилка" }],
		"s-750-1001-1105-0": [
			{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 375, 100, 4000] }
		],
		"s-750-1001-1109-0": [{ type: "text", sub_type: "message", message: "Move out", message_RU: "Выйти" }],
		"s-750-1001-1110-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],
		"s-750-1001-2102-0": [{ type: "text", sub_type: "message", message: "Spin", message_RU: "Крутилка" }],
		"s-750-1001-2105-0": [
			{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 375, 100, 4000] }
		],
		"s-750-1001-2109-0": [{ type: "text", sub_type: "message", message: "Move out", message_RU: "Выйти" }],
		"s-750-1001-2110-0": [{ type: "text", sub_type: "message", message: "Knock down", message_RU: "Опрокид" }],

		// 2 BOSS
		"nd-750-1002": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-750-45016-1308-0": [
			{ type: "text", sub_type: "message", message: "Circle of poison", message_RU: "Ядовитый круг" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 375, 100, 6000] }
		],
		"s-750-1002-1107-0": [{ type: "text", sub_type: "message", message: "Flying attack", message_RU: "Летающая атака" }],
		"s-750-1002-2107-0": [{ type: "text", sub_type: "message", message: "Flying attack", message_RU: "Летающая атака" }],
		"s-750-1002-1108-0": [{ type: "text", sub_type: "message", message: "Overpower", message_RU: "Подавление" }],
		"s-750-1002-2108-0": [{ type: "text", sub_type: "message", message: "Overpower", message_RU: "Подавление" }],
		"s-750-1002-2104-0": [
			{ type: "text", sub_type: "message", message: "Pull", message_RU: "Стяжка" },
			{ type: "text", sub_type: "message", "delay": 3000, message: "Dodge", message_RU: "Эвейд" }
		],
		"s-750-1002-1104-0": [
			{ type: "text", sub_type: "message", message: "Pull", message_RU: "Стяжка" },
			{ type: "text", sub_type: "message", "delay": 3000, message: "Dodge", message_RU: "Эвейд" }
		],

		// 3 BOSS
		"nd-750-1003": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-750-1003-1306-0": [{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" }],
		"s-750-1003-1309-0": [{ type: "text", sub_type: "message", message: "Broken shield", message_RU: "Сломать щит" }],
		"s-750-1003-2301-0": [{ type: "text", sub_type: "message", message: "Hit Crystal column", message_RU: "Кристальная колонна" }],
		"s-750-1003-2306-0": [{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" }]
	};
};