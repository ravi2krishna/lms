pipeline {
    agent any

       stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Analyze Code..'
		sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://52.15.96.195:9000" -e SONAR_LOGIN="sqp_a080f7fec319c390d902d5d4297da4cfbc2ebaa3"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
       						 }
        stage('Build') {
            steps {
                echo 'Building..'
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
