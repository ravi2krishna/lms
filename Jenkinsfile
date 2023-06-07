pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
         withCredentials([usernamePassword(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
             //sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://13.92.5.110:9000" -e SONAR_LOGIN="sqp_cab9202255bd4cf50f3dbba65bb5aaef79ed00fa"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://18.189.7.175:9000" -e SONAR_LOGIN=$SONAR_TOKEN  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            
         }         
       }   
    }
}
