export default class Maps {
  constructor(width, height, bombs, emptyX, emptyY){
    this.bombMap = [];
    for (let i = 0; i <= width + 1; i++) {
      this.bombMap[i] = [];
      for (let j = 0; j <= height + 1; j++){
        this.bombMap[i][j] = 0;
      }
    }
    for (let i = 1; i <= bombs; i++){
      // Math.floor(Math.random() * (max - min)) + min;
    }
    // Math.floor(Math.random() * (max - min)) + min;
  }

  getBombMap() {
    console.log(this.bombMap);
  }
  
}