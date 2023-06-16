pipeline {
    agent any

    stages {
        
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
                sh "curl -v -u admin:Admin123* --upload-file webapp/dist-'${packageJSONVersion}'.zip http://18.219.166.107:8081/repository/lms/"  
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                echo 'Deploying....'
                sh "curl -u admin:Admin123* -X GET \'http://18.219.166.107:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                sh 'sudo rm -rf /var/www/html/*'
                sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                sh "sudo cp -r webapp/dist/* /var/www/html/"
                }
            }
        }
    }
}
