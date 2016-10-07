export function bemify(cls, mod) {
	if(mod.startsWith("--")) {
		cls = cls.split(" ");
		return `${cls} ${cls[cls.length - 1]}${mod}`;
	} else if(mod.startsWith("__")){
		return cls + mod;
	} else {
		return cls + " " + mod;
	}
}
