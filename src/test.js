const toRna = (input) => {
    // G -> C
    // C -> G
    // T -> A
    // A -> U
    var output = "";
    console.log(input?.length, "len")
    if (input?.length > 1) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] === "G") output += "C";
            if (input[i] === "C") output += "G";
            if (input[i] === "T") output += "A";
            if (input[i] === "A") output += "U";
        }
    }
    else {
        if (input === "G") output += "C";
        if (input === "C") output += "G";
        if (input === "T") output += "A";
        if (input === "A") output += "U";
    }
    return output;
};
console.log(toRna("ACGTGGTCTTAA"))
