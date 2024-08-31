<?php
include "scode/header.php";
?>
<?php
    if(isset($_SESSION['email'])){
        ?>
        <main>
            <h1>Hello <?php echo $_SESSION['fname'] . ' ' . $_SESSION['lname']?></h1>
            <p>Your Email is: <?php echo $_SESSION['email']?></p>
            <icon name="logout" id="logout">logout</icon>
        </main>
        <?php
    }else{
        ?>
        <main class="reg">
            <section>
                <h1>Welcome to Weave.io</h1>
                <p>Build your website with ease, with limitless potential, build robust websites and apps with nothing but the limitations of your imagination.</p>
            </section>
            <form method="post">
                <h1>Sign Up</h1>
                <span class="input">
                    <input type="email" name="email" id="email" autocomplete="email">
                    <label for="email">Email</label>
                </span>
                <span class="input-group">
                    <span class="input">
                        <input type="text" name="fname" id="fname" autocomplete="given-name">
                        <label for="fname">First Name</label>
                    </span>
                    <span class="input">
                        <input type="text" name="lname" id="lname" autocomplete="family-name">
                        <label for="lname">Last Name</label>
                    </span>
                </span>
                <span class="input-group">
                    <span class="input">
                        <input type="password" name="psw" id="psw" autocomplete="new-password">
                        <label for="psw">Password</label>
                    </span>
                    <span class="input">
                        <input type="password" name="cpsw" id="cpsw" autocomplete="new-password">
                        <label for="cpsw">Confirm Password</label>
                    </span>
                </span>
                <div class="button">
                    <button type="submit" name="signup">Sign Up</button>
                    <span class="login">Login</span>
                </div>
            </form>
        </main>
        <?php
    }
?>
<?php
include "scode/footer.php";