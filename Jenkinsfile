pipeline {
    agent {
        tools {
            nodejs 'node21' 
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs('v21.7.2') {
                    sh 'pnpm -v'
                    sh 'npm install'
                }
                echo 'download done'
                nodejs('v21.7.2') {
                    sh 'npm run build-v'
                }
                echo 'build done'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'cp -r ./dist /var/www/html/csc'
                echo 'copy done'
            }
        }
    }
}