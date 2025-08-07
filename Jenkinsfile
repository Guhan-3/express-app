pipeline{
    agent any
    tools {
        nodejs 'node'
    }
    stages{
        stage ('checkout') {
            steps {
                checkout scm
            }
        }
        stage ('install dependencies'){
            steps{
                sh 'npm install'
            }
        }
        stage ('run tests') {
            steps {
                sh 'npm test'
            }
        }
        stage ('build') {
            steps {
                sh 'npm run build'
            }
        }
        post{
            always {
                deleteDir()
                echo 'Cleaning workspace after build.'

            }
            sucess{
                echo 'Build completed successfully.'
            }
            failure {
                echo 'Build failed. Check test reports and logs for more info.'
            }

        }

}
