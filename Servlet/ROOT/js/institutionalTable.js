        File
        
        var reader = new FileReader();
        this.output =reader.readAsText(home/ec2-user/institutionSample.json);
        this.array = JSON.parse(this.output);
        this.arrayOut = this.array.data;


class institutionalTable{
    
    constructor(file){
        var reader = new FileReader();
        this.output =reader.readAsText("home/ec2-user/institutionSample.json");
        this.array = JSON.parse(this.output);
        this.arrayOut = this.array.data;
    }
    
    
}

