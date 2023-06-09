pipeline {
    agent any

    stages {

         stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://52.66.12.85:9000/" -e SONAR_LOGIN="sqp_d0d19b20d68a420ea2a1f873f756dfa0bf4493c1"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }
        stage('Build Lms') {
            steps {
                echo 'Building Artifects..'
                sh 'cd webapp && npm install && npm run build'
            }
        }
       
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}