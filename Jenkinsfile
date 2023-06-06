pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Sonar Analysis'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://http://43.205.68.187/:9000" -e SONAR_LOGIN="sqp_6319576a8565b5f128fc25c3cac0d3ac7cf484af"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
            }
        }    

        stage('Build & Release') {
            steps {
                script {
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                sh "echo '${packageJSONVersion}'"

                echo 'Building'
                sh 'cd webapp && npm install && npm run build'
                
                echo 'Releasing'
                sh "zip webapp/dist-'${packageJSONVersion}'.zip -r webapp/dist"
                sh "curl -v -u admin:Admin123* --upload-file webapp/dist-'${packageJSONVersion}'.zip http://http://43.205.68.187/:8081/repository/lms/"  
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                echo 'Deploying....'
                sh "curl -u admin:Admin123* -X GET \'http://http://43.205.68.187/:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                sh 'sudo rm -rf /var/www/html/*'
                sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                sh "sudo cp -r webapp/dist/* /var/www/html/"
                }
            }
        }
    }
}
