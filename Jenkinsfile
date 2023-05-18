pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://13.92.5.110:9000" -e SONAR_LOGIN="sqp_cab9202255bd4cf50f3dbba65bb5aaef79ed00fa"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }

        stage('Build LMS') {
            steps {
                echo 'Testing..'
            }
        }

        stage('Release LMS') {
            steps {
                echo 'Deploying....'
            }
        }

        stage('Deploy LMS') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}