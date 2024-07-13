class Car {
    brand;
    model;
    speed=0;
    isTrunkOpen=false;

    constructor(brandName, modelName){
        this.brand=brandName;
        this.model=modelName;
        // this.speed=0;
    }

    displayInfo(){
        console.log(`${this.brand} ${this.model} , Speed: ${this.speed} , isTrunkOpen: ${this.isTrunkOpen}`);
    }

    go(){
        if(!this.isTrunkOpen){
            this.speed+=5;
        }
    }

    brake(){
        if(this.speed >= 5){
            this.speed-=5;
        }
    }

    openTrunk(){
        if(this.speed == 0){
            this.isTrunkOpen=true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen=false;
    }
}

const toyota = new Car('Toyota','Corolla')
const tesla = new Car('Tesla','Model 3')

toyota.openTrunk()
toyota.displayInfo()

toyota.go()
toyota.displayInfo()

toyota.closeTrunk()
toyota.displayInfo()

toyota.go()


toyota.displayInfo()
tesla.displayInfo()