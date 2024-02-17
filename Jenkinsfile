pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Analyze Code'
                sh'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://54.252.31.46:9000/" -e SONAR_LOGIN="sqp_778d8280feb530e2902e51a5cf0385383e126649"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        } 
    } 
}
