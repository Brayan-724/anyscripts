((win, doc)=>{win.mod = ((win, doc)=>{

/* Translates */
const trans = {
	En_Us: {
		error: {
			contextNotDefined() {return `Pass context, use 'window' or 'globalThis'`},
			contextNotType(type) {return `Context not is a object, is ${type}`},
			
			moduleNotDefined() {return `Module not defined`},
			moduleNotExist() {return `Module not exist`},
			typeNotValid() {return `Type not valid`},
		}
	},
	
	Es_Mx: {
		error: {
			contextNotDefined() {return `Necesita el contexto, usa 'window' o 'globalThis'`},
			contextNotType(tipo) {return `El contexto no es un objeto, es ${NS.type.trans(tipo)}`},
			
			moduleNotDefined() {return `Modulo no definido`},
			modeluNotExist() {return `Modulo no existe`},
			typeNotValid() {return `Tipo no valido`}
		}
	}
}


function ERROR(msg, ...args) {
	return NS.ERROR("", trans[NS.config.lang].error[msg].apply(args));
}

const modules = {
	"NS:0": {
		get value() {return NS},
		get activation() {return "505_NO_ACTIVATE"},
		get id() {return 0},
		get rating() {return 5}
	}
};

const modulesId = ["NS:0"];

/*			++++Method++++
 * Import a module with name or id
 @ moduleName_Or_moduleId: string | int
 @ context: moduleContext
 *
 & return: any
 */
function _import(moduleName_Or_moduleId, context) {
	const tp = typeof moduleName_Or_moduleId;
	let elm;
	
	if(tp === NS.type.und) {
		throw ERROR("moduleNotDefined");
	} else 
	if(tp === NS.type.str) {
		return R(moduleName_Or_moduleId);
	} else 
	if(tp === NS.type.num) {
		return R(modulesId[moduleName_Or_moduleId]);
	} else {
		throw ERROR("typeModuleNotValid", tp);
	}
	
	function R(moduleName) {
		elm = modules[moduleName];
		if(typeof elm !== NS.type.und) {
			const prefix = "mod:"+moduleName;
			const imported = prefix+":imported";
			
			if(!context.c[imported]) {
				context.c[imported] = true;
				
				if(elm.activation === "505_NO_ACTIVATE")
					context.c[prefix] = elm.value;
				else
					context.c[prefix] = elm.activation(context.c, context.d);
				
				return context.c[prefix]
			}
		} else {
			throw new Error(trans[NS.config.lang].error.moduleNotExist(moduleName));
		}
	}
}

/*			++++Method++++
 * Export module to global use
 @ moduleName: string
 @ value: any
 *
 & return module id
 & return: int
 */
function _export(moduleName, value, context) {
	
}

/*			++++Method++++
 * Show the module list
 */
function showList() {
	console.log(modulesId.join("\n"));
}

/*			++++Property++++
 * Get module context
 @ c: globalThis | window
 *
 & return: moduleContext
 */
function context(c,d) {
	if(NS.type.getType(c, false) === NS.type.und) 
		throw new Error(trans[NS.config.lang].error.contextNotDefined());
	
	if(NS.type.getType(c, false) !== NS.type.obj)
		throw new Error(trans[NS.config.lang].error.contextNotType(typeof c));
	
	return new (class moduleContext {
		c; /* subContext */
		d; /* document */
		constructor(c, d) {
			this.c = c;
			this.d = d;
			this.totalModules = c?.mds?.totalModules || 0;
			this.imported = c?.mds?.imported;
		}
	})(c, d);
}

return {
	get _import() {return _import},
	get _export() {return _export},
	get showList() {return showList},
	get getContext() {return context},
}

})(win,doc);})(globalThis || window || this, document);