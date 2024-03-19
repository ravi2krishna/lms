pipeline {
    agent any

    stages {
        stage('LMS-Code-Analysis') {
            steps {
                echo 'Sonar Analysis'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://54.212.22.255:9000" -e SONAR_LOGIN="sqp_e3e91a31407cf311adf9c52d966075a60ee480e0"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
                echo 'Analysis Completed'
            }
        }
    }
}