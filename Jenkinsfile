pipeline {
    agent any
    stages {
        stage('first') {
            steps {
                sh 'git pull'
            }
        }
        stage('build') {
            steps {
                sh 'pnpm build'
            }
        }
        stage('publish') {
            steps {
                sh 'pnpm pub'
            }
        }
    }
}
