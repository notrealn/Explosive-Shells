// create a simple shockwave effect
const siloLaunchEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.lightGray, e.fin()); //color goes from white to light gray
    Lines.stroke(e.fout() * 3); //line thickness goes from 3 to 0
    Lines.circle(e.x, e.y, e.fin() * 100); //draw a circle whose radius goes from 0 to 100
});

// create the block type
const silo = extendContent(Block, "scatter-silo", {
    // override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            //configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    // override configure event
    configured(tile, value){
        // make sure this silo has the items it needs to fire
        if(tile.entity.cons.valid()){
            // make this effect occur at the tile location
            Effects.effect(siloLaunchEffect, tile)

            // create 10 bullets at this tile's location with random rotation and velocity/lifetime
            for(var i = 0; i < 10; i++){
                Calls.createBullet(Bullets.flakExplosive, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
            }
            // triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
})


// create the block type
const shockAndAwe = extendContent(Block, "shock-and-awe", {
    // override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            // configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    // override configure event
    configured(tile, value){
        //make sure this silo has the items it needs to fire
        if(tile.entity.cons.valid()){
            // make this effect occur at the tile location
            Effects.effect(siloLaunchEffect, tile)
            
            // create 20 bullets at this tile's location with random rotation and velocity/lifetime
            for(var i = 0; i < 20; i++){
                Calls.createBullet(
                    buleet2,
                    tile.getTeam(),
                    tile.drawx(),
                    tile.drawy(),
                    Mathf.random(360),
                    Mathf.random(1.0, 4.0),
                    Mathf.random(1.0, 4.0)
                )
            }
            // triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
})

const buleet2 = extend(FlakBulletType, {
    hitSize: 0,
    collidesTiles: false,
    collides: true,
    collidesAir: false,
    speed: 5,
    damage: 10,
    splashDamage: 40,
    splashDamageRadius: 30,
    despawnEffect: "shockwave",
    bulletWidth: 10,
    bulletHeight: 15,
    ammoMultiplier: 1,
    fragBullets: 5,
    fragVelocityMin: 0.5,
    fragVelocityMax: 1.5,
    fragBullet: {
      type: "BombBulletType",
      bulletWidth: 8,
      bulletHeight: 10,
      damage: 5,
      splashDamage: 20,
      splashDamageRadius: 20,
      drag: 0,
      despawnEffect: "flakExplosionBig",
      lifetime: 60,
      collides: false
    }
})

            
const booleet = extend(FlakBulletType, {
    damage: 5,
//     pierce: true,
    despawnEffect: "flakExplosionBig",
    bulletWidth: 15,
    bulletHeight: 20,
    fragBullets: 50,
    fragVelocityMin: 1,
    fragVelocityMax: 2,
    fragBullet: {
        lifetime: 600,
        bulletWidth: 15,
        bulletHeight: 20,
        fragBullets: 5,
        fragVelocityMin: 1,
        fragVelocityMax: 2,
        damage: 5,
//         pierce: true,
        despawnEffect: "flakExplosionBig",
        fragBullet: {
            lifetime: 60,
            bulletWidth: 15,
            bulletHeight: 20,
            damage: 5,
//             pierce: true,
            despawnEffect: "flakExplosionBig",
        }
    }
});
