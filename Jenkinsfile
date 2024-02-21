pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'LMS Code Analysis'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://34.214.125.103:9000" -e SONAR_LOGIN="sqp_407ea45a8614704dafbd1b663cf22f2694162fc1"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }

        stage('Build LMS') {
            steps {
                echo 'LMS Build'
                sh 'cd webapp && npm install && npm run build'
            }
        }

    }
}
