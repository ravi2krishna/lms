pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://18.224.11.74:9000" -e SONAR_LOGIN="sqp_ab0ee98afd2e65f18a1d8fff298cfea90c80406e"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'cd webapp && npm install && npm run build'
            }
        }
        stage('Release') {
            steps {
                script {
                    echo "Releasing.."       
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                    sh "zip webapp/dist-${packageJSONVersion}.zip -r webapp/dist"
                    sh "curl -v -u admin:Admin123* --upload-file webapp/dist-${packageJSONVersion}.zip http://18.224.11.74:8081/repository/lms/"     
            }
            }

        }
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying.."       
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                     sh "curl -u admin:Admin123* -X GET \'http://18.224.11.74:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                     sh 'sudo rm -rf /var/www/html/*'
                     sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                     sh "sudo cp -r webapp/dist/* /var/www/html"        
            }
        }
    }
}
}