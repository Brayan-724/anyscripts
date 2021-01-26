(()=>{

// Translates
const Trans = {
	// Default - English
	En_Us: {
		error: {}
	}
};

const _config = {
	lang: "En_Us"
};

/* All Types */
const type = {
	obj: "object",
	str: "string",
	bol: "boolean",
	num: "number",
	und: "undefined",
	fun: "function",
	sym: "symbol",
	
	trans(type) {
		const t = type;
		return 	t === "object"?
					"objeto":
				t === "string"?
					"texto":
				t === "number"?
					"número":
				t === "boolean"?
					"booleano":
				t === "undefined"?
					"indefinido":
				t === "function"?
					"función":
				t === "symbol"?
					"symbolo":
				"[NotType]";
	},
	
	/*
	 * Get true type
	 @ obj: any
	 @ strict: bool = true
	 *
	 & return: string
	 */
	getType(obj, strict = true) {
		const t = typeof obj;
		return strict ? 
				t === "object" ? 
					obj.constructor.name : 
					t : 
				t;
	},
	
	/*
	 * Comparate two types
	 @ obj1: any
	 @ obj2: any
	 @ strict: bool = true
	 *
	 & return: bool
	 */
	compare(obj1, obj2, strict = true) {
		const t0 = typeof obj;
		const r0 = strict ? 
					t0 === "object" ? 
						obj.constructor.name : t0 : 
					t0;
		const t1 = typeof obj;
		const r1 = strict ? 
					t1 === "object" ? 
						obj.constructor.name : t1 : 
					t1;
		return r1 === r0;
	}
};

function isObject(obj) {
	return obj !== null && typeof obj === "object";
};

function toBool(val) {
	return typeof val !== "undefined" && (typeof val === "string" ? val === "true" : val);
};


/* Show warn */
function WARN(msg) {
	console.warn("[[Ns.js]]: "+msg);
};
/* Error */
function ERROR(name, msg) {
	return `[[Ns.js]] ${name}: ${msg}`;
};

const Exporting = {};
function Out(key, value) {
	Exporting[key] = value;
};

/* Export all */
Out("type", type);
Out("config", _config);
Out("ERROR", ERROR);

(globalThis || window || this).NS = Exporting;
})();