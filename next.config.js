module.exports = {
    env: {
      HOST: 'http://localhost' , //'http://ec2-52-17-51-8.eu-west-1.compute.amazonaws.com',
      BACKEND_HOST: 'http://localhost' , //ec2-52-17-51-8.eu-west-1.compute.amazonaws.com',
      PORT: 3000 ,
      BACKEND_PORT: 3003
    },
   
    images: {
        domains: [ 'ec2-52-17-51-8.eu-west-1.compute.amazonaws.com' ],
    },
   
}