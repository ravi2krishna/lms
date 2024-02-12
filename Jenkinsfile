pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Analyze Code'
                sh'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://35.94.168.187:9000/" -e SONAR_LOGIN="sqp_674b39fedee8a119d6f3fdd83fb0d28f490b5280"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }

        stage('Build App') {
            steps {
                echo 'Building App'
                sh'cd webapp && npm install && npm run build'
            }
        }
    }
}
