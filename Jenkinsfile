pipeline {
    agent any

    stages {
        
        stage('SonarAnalysis') {
            steps {
                echo 'SonarAnalysis..'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://3.12.35.119:9000" -e SONAR_LOGIN="sqp_61675ccbe677383921c6eb020644d0a56cd116c0"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'cd webapp && npm install && npm run build'
            }
        }  
         stage('Release LMS') {
            steps {
                script {
                    echo "Releasing.."       
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                    sh "zip webapp/dist-${packageJSONVersion}.zip -r webapp/dist"
                    sh "curl -v -u admin:Admin123* --upload-file webapp/dist-${packageJSONVersion}.zip http://3.12.35.119:8081/repository/lms/"     
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
                    sh "curl -u admin:Admin123* -X GET \'http://3.12.35.119:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                    sh 'sudo rm -rf /var/www/html/*'
                    sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                    sh "sudo cp -r webapp/dist/* /var/www/html"
            }
            }
        }
    }
}