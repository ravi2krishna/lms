pipeline {
    agent any

       stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Analyze Code..'
		sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://52.15.96.195:9000" -e SONAR_LOGIN="sqp_a080f7fec319c390d902d5d4297da4cfbc2ebaa3"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
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
                    sh "curl -v -u admin:lms12345 --upload-file webapp/dist-${packageJSONVersion}.zip http://3.133.106.4:8081/repository/lms/"     
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
