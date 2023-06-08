pipeline {
    agent any 

    stages {
        stage('Test') { 
            steps {
                echo 'sonar analysis..'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://15.207.71.87:9000" -e SONAR_LOGIN="sqp_2a4f79f7274b119b00a43ec599bd49429e6fa9d7"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
  }
        }
        stage('Build & release') { 
            steps {
                script {
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    sh "echo '${packageJSONVersion}'"
                }
                echo 'building..'
                sh 'cd webapp && npm install && npm run build'

            echo 'Release..'
sh 'cd webapp && zip dist-${packageJSONVersion}.zip -r dist'
sh 'ls webapp'
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Deploying..'
            }
        }
    }
}