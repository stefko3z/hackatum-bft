export const getAppBackground = () => {    
    const shades = [
        "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        "linear-gradient(to right, #dd3e54, #6be585)",
        "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
        "linear-gradient(to right, #b993d6, #8ca6db)",
        "linear-gradient(to right, #77a1d3, #79cbca, #e684ae)"
    ];

    const index = Math.floor(Math.random() * (shades.length - 1));

    return shades[index];
}