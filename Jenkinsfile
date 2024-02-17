pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Analyze Code'
                sh'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://54.252.31.46:9000" -e SONAR_LOGIN="sqp_6747069f6b2f6c0a7bc97cf83a13abc1c3934f4f"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
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
                    sh "curl -v -u admin:Sathish@1989 --upload-file webapp/dist-${packageJSONVersion}.zip http://54.252.31.46:8081/repository/lms/"      
                }
            }
        }I



    } 
}
