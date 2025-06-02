pipeline {
    agent any
    
    options {
        skipDefaultCheckout(false) // ✅ 필수: 기본 checkout 활성화
    }
    
    tools {
		    nodejs 'NodeJS 16.13.2'
		}

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS-Access-Key')
        AWS_SECRET_ACCESS_KEY = credentials('AWS-Secret-Key')
        S3_BUCKET             = 'runners-hi-frontend-app'
        DIST_DIR              = 'build'
        REGION                = 'ap-northeast-2'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                echo "📦 Installing dependencies"
                npm install
                '''
            }
        }

        stage('Build React') {
            steps {
                sh '''
                echo "🔨 Building React App"
                CI=false npm run build
                '''
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                echo "🚀 Deploying to S3"
                aws s3 sync $DIST_DIR s3://$S3_BUCKET --delete --region $REGION
                '''
            }
        }
    }
}