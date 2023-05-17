export default class Maps {
  constructor(){
    this.bombMap = [];
    this.fieldMap = [];
    this.openedCellsMap = [];  
  }


  generateMaps(width, height, bombs, emptyX, emptyY) {
    // generate bomb map
    for (let i = 0; i <= width + 1; i++) {
      this.bombMap[i] = [];
      for (let j = 0; j <= height + 1; j++){
        this.bombMap[i][j] = 0;
      }
    }
    for (let i = 1; i <= bombs; i++){
      let x = Math.floor(Math.random() * ((width + 1) - 1)) + 1;
      let y = Math.floor(Math.random() * ((height + 1) - 1)) + 1;
      if (x !== emptyX && y !== emptyY && this.bombMap[x][y] !== 1) {
        this.bombMap[x][y] = 1;
      } else {
        i--;
      }      
    }
    // calculate field map
    for (let i = 0; i < width; i++){
      this.fieldMap[i] = [];
      for (let j = 0; j < height; j++){
        if (this.bombMap[i+1][j+1] === 1){
          this.fieldMap[i][j] = 'B'
        } else {
          this.fieldMap[i][j] = 
            this.bombMap[i][j]   + this.bombMap[i+1][j]   + this.bombMap[i+2][j] + 
            this.bombMap[i][j+1] +                          this.bombMap[i+2][j+1] + 
            this.bombMap[i][j+2] + this.bombMap[i+1][j+2] + this.bombMap[i+2][j+2];
        }
      }
    }
    // generate opened cells map
    for (let i = 0; i < width; i++){
      this.openedCellsMap[i] = [];
      for (let j = 0; j < height; j++){
        this.openedCellsMap[i][j] = false;
      }
    }  
  }

  getBombMap() {
    console.log(this.bombMap);
    console.log(this.fieldMap);
    console.log(this.openedCellsMap);
  }
  
}