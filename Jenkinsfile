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
                echo 'Building Artifacts..'
                sh 'cd webapp && npm install && npm run build'
            }
        }

        stage('Release LMS') {
            steps {
                echo 'Store Artifacts....'
                sh 'cd webapp && zip dist-1.zip -r dist'
                sh 'cd webapp && curl -v -u admin:Admin123* --upload-file dist-1.zip http://13.92.5.110:8081/repository/lms/'
            }
        }

        stage('Deploy LMS') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}