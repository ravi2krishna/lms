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

        stage('Release App') {
            steps {
                script {
                  echo 'Releasing App'     
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                    sh "zip webapp/dist-${packageJSONVersion}.zip -r webapp/dist"
                    sh "curl -v -u admin:lms12345 --upload-file webapp/dist-${packageJSONVersion}.zip http://35.94.168.187:8081/repository/lms/"      
                }
            }
        }

        stage('Deploy App') {
            steps {
                script {
                  echo 'Deploying App'     
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                    sh "curl -u admin:lms12345 -X GET \'http://35.94.168.187:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                    sh 'sudo rm -rf /var/www/html/*'
                    sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                    sh "sudo cp -r webapp/dist/* /var/www/html"
                }
            }
        }

    }
}
