function fileFunction(){
    console.log('module1 -->  functions ---> fileFunction Executed');
    framework.services.module1.module1Service.myService1();

}

module.exports = {
    fileFunction
};