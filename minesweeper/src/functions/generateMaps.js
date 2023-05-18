export default class Maps {
  constructor(width, height){
    this.bombMap = [];
    this.fieldMap = [];
    this.openedCellsMap = [];  

    // generate opened cells map
    for (let i = 0; i < width; i++){
      this.openedCellsMap[i] = [];
      for (let j = 0; j < height; j++){
        this.openedCellsMap[i][j] = null;
      }
    }  
  }


  generateMaps(width, height, bombs, emptyX, emptyY) {
    // generate bomb map
    let emptyCellsArray = []
    for (let i = 0; i <= width + 1; i++) {
      this.bombMap[i] = [];
      for (let j = 0; j <= height + 1; j++){
        this.bombMap[i][j] = 0;
        if (i !== 0 && i !== width + 1 && j !== 0 && j !== height + 1) {
          emptyCellsArray.push([i, j]);
        }
        
      }
    }

    // delete first klicks cell
    emptyCellsArray.splice(emptyCellsArray.findIndex(cellNum => JSON.stringify(cellNum) === JSON.stringify([emptyX, emptyY])), 1);

    for (let i = 1; i <= bombs; i++){
      let bombCellNum = Math.floor(Math.random() * ((emptyCellsArray.length) - 0)) + 0;
      this.bombMap[emptyCellsArray[bombCellNum][0]][emptyCellsArray[bombCellNum][1]] = 1;
      emptyCellsArray.splice(bombCellNum, 1);
    }

    

    // calculate field map
    for (let i = 0; i < width; i++){
      this.fieldMap[i] = [];
      for (let j = 0; j < height; j++){
        if (this.bombMap[i+1][j+1] === 1){
          this.fieldMap[i][j] = 'bomb'
        } else {
          this.fieldMap[i][j] = 
            this.bombMap[i][j]   + this.bombMap[i+1][j]   + this.bombMap[i+2][j] + 
            this.bombMap[i][j+1] +                          this.bombMap[i+2][j+1] + 
            this.bombMap[i][j+2] + this.bombMap[i+1][j+2] + this.bombMap[i+2][j+2];
        }
      }
    }
    
  }

  getValueFieldMap(x, y) {
    return this.fieldMap[x][y];
  }

  setValueOpenedCellsMap(x, y, value) {
    this.openedCellsMap[x][y] = value;
    return;
  }

  getValueOpenedCellsMap(x, y) {
    return this.openedCellsMap[x][y];
  }

  getOpenedCellsMap() {
    return this.openedCellsMap;
  }

  getFieldMap() {
    return this.fieldMap;
  }
  
}