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
              
                echo 'building..'
                sh 'cd webapp && npm install && npm run build'

            echo 'Release..'
sh "zip webapp/dist-'${packageJSONVersion}'.zip -r webapp/dist"
sh "curl -v -u admin:Admin@123 --upload-file webapp/dist-'${packageJSONVersion}'.zip http://15.207.71.87:8081/repository/lms/"  
                }
            }
        }
        stage('Deploy') { 
            steps {
                script{
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                echo 'Deploying....'
                sh "curl -u admin:Admin123* -X GET \'http://15.207.71.87:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                sh 'sudo rm -rf /var/www/html/*'
                sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                sh "sudo cp -r webapp/dist/* /var/www/html/"
            }
        }
    }
}
}