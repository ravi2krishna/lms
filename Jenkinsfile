pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Sonar Analysis'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://18.219.166.107:9000" -e SONAR_LOGIN="sqp_6319576a8565b5f128fc25c3cac0d3ac7cf484af"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
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
                sh 'cd webapp && ls dist'

                echo 'Releasing'
                sh 'cd webapp && zip dist-${packageJSONVersion}.zip -r dist'
                sh 'ls webapp'



                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}