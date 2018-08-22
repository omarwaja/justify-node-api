
module.exports = {
// adding spaces to get 80 char in a line
    addspaceToLigne: (text) => {
        var ligneinter = '';
        var end = text.trim().length;
        var spacetoadd = 80 - end;
        var lignetable = text.trim().split(' ');
        for(let k = lignetable.length-1; k >=0 ; k--)
        {
            if(spacetoadd > 0)
            {
                ligneinter = '  ' + lignetable[k].trim() + ligneinter;
                spacetoadd --;
            }
            else {
                ligneinter = ' ' + lignetable[k].trim() + ligneinter;
            }

        }
        console.log("charperligne: "+ligneinter.trim().length);
        return(ligneinter.trim());

},


    justify: (text) => {
        var textable = text.trim().split(' ');
        var ligne = '';
        var paragraph = '';
        for(let i=0;i < textable.length;i++){
            let textabinter = textable[i].trim().split('\n');
            for(let j=0;j< textabinter.length;j++ ) {
                if ((ligne.length + textabinter[j].length + 1) <= 80) {
                    ligne += ' ' + textabinter[j].trim();
                }
                else {
                    var textspaced = module.exports.addspaceToLigne(ligne);
                    paragraph += textspaced.trim() + '\n';
                    ligne = textabinter[j].trim();
                }
            }
        }
        paragraph += ligne;
        return(paragraph);
    },
}