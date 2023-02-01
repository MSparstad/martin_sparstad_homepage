<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <![endif]-->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <div id="body-wrapper">
            <section class="navigation">
                <div class="container">
                    <div class="nav-wrapper">
                        <a class="item brand" href="martinsparstad.com">
                            <img class="logo" src="images\temp-logo.png"/>
                            <span>Martin Sparstad</span>
                        </a>
                        <nav>
                            <div class="nav-item-outer">
                                <a class="mobile-only" href="admin.php">
                                    <span>Home</span>
                                </a>
                            </div>
                            <div class="nav-item-outer">
                                <a href="martinsparstad.com">
                                    <span>About</span>
                                </a>
                            </div>
                            <div class="nav-item-outer">
                                <a href="martinsparstad.com">
                                    <span>Music</span>
                                </a>
                            </div>
                            <div class="nav-item-outer">
                                <a href="https://github.com/MSparstad">
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div .class="language-selection">
                    </div>
                    <div class="theme-toggle">
                        <button>
                            <img class="theme-toggle" src="images/moon.png" alt="theme-toggle">
                        </button>
                    </div>
                </div>
            </section>
            <main>
                <div>
                    <div class="container">
                        <div class="hero-wrapper">
                            <header class="hero index">
                                <h1>Hei, jeg heter Martin!</h1>
                                <p class="hero-description small width">Dette er et samlested for mine aktiviteter<br> på nett.
                                    Jeg liker å lage musikk, programere og spille
                                    spill.<br>Her håper jeg å samle en god blanding av det hele,<br> 
                                    både som motivasjon for a å lage ting og som et verktøy for tilbakeblikk.                                    
                                    </p>
                            </header>
                            <div class="decoration">
                                <img class="image hero-image" src="images/headphones.png" alt="image of headphones with html tags between them"/>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <section class="segment blog-segment">
                            <h2>Latest posts</h2>
                            <div class="posts">
                                <a class="post">
                                    <h3>Test post 1</h3>
                                    <time>January 28, 2023</time>
                                </a>
                                <a class="post">
                                    <h3>Test post 2</h3>
                                    <time>January 28, 2023</time>
                                </a>
                                <a class="post">
                                    <h3>Test post 3</h3>
                                    <time>January 28, 2023</time>
                                </a>
                                <?php include_once('scripts/connection.php'); ?>
                                <?php
                                $sql = 'SELECT * from posts;';
                                $result = mysqli_query($connection, $sql);
                                $resultCheck = mysqli_num_rows($result);
                                
                                if($resultCheck > 0){
                                    while($row = mysqli_fetch_assoc($result)) {
                                        echo '<a class="post"><h3>' . $row['title'] . '</h3><time>' . $row['time'] . '</time></a>';
                                    }
                                }                                
                                ?>
                            </div>
                        </section>
                    </div>                    
                </div>
            </main>
        </div>

        
    </body>
</html>