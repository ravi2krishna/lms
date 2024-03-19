pipeline {
    agent any

    stages {
        stage('LMS-Code-Analysis') {
            steps {
                echo 'Sonar Analysis'
                sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://54.212.22.255:9000" -e SONAR_LOGIN="sqp_e3e91a31407cf311adf9c52d966075a60ee480e0"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
                echo 'Analysis Completed'
            }
        }

        stage('LMS-Build') {
            steps {
                echo 'Building LMS'
                sh 'cd webapp && npm install && npm run build'
                echo 'Building Completed'
            }
        }

        stage('LMS-Release') {
            steps {
                script {
                    echo "Publish LMS Artifacts"       
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                    sh "zip webapp/lms-${packageJSONVersion}.zip -r webapp/dist"
                    sh "curl -v -u admin:lms12345 --upload-file webapp/lms-${packageJSONVersion}.zip http://54.212.22.255:8081/repository/lms/"     
            }
            }
        }
    }
}